import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db/db";
import users from "@/app/db/schemas/users/users";
import { checkPassword } from "@/app/helpers/checkPassword";

export const POST = async (req: NextRequest) => {
  await db();
  const { email, password }: { email: string; password: string } =
    await req.json();

  const user = await users.findOne({ email });
  console.log("user POST: ", user);

  if (!user) {
    return NextResponse.json(
      { message: "User not exist", ok: false },
      { status: 404 }
    );
  }

  const checkAccess = checkPassword(password, user.password);

  if (!checkAccess) {
    return NextResponse.json(
      { message: "Not allowed", ok: false },
      { status: 403 }
    );
  }

  const userData = {
    name: user.name,
    email: user.email,
    _id: user.id,
  };

  return NextResponse.json(
    { message: "Allowed", ok: true, body: userData },
    { status: 200 }
  );
};
