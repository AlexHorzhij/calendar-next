import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db/db";
import users from "@/app/db/schemas/users/users";
import { hashPassword } from "@/app/helpers/hashPassword";

export const POST = async (req: NextRequest) => {
  await db();
  const { name, email, password } = await req.json();

  const checkDoubleEmail = await users.findOne({ email });

  if (checkDoubleEmail) {
    return NextResponse.json(
      { message: "User exist", ok: false },
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await users.create({ name, email, password: hashedPassword });

  if (!user) {
    return NextResponse.json(
      { message: "User wasn`t created", ok: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "User created", ok: true, body: user },
    { status: 201 }
  );
};
