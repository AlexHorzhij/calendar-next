import db from "@/app/db/db";
import event from "@/app/db/schemas/events";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await db();
  const events = await event.find({});
  if (!events) {
    return NextResponse.json(
      { message: "Events not found", ok: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ body: events, ok: true });
};

export const POST = async (req: NextRequest) => {
  await db();
  const data = await req.json();

  const response = await event.create(data);

  if (!response) {
    return NextResponse.json(
      { message: "Event was not created", ok: false },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { message: "Event was created", ok: true, body: response },
    { status: 201 }
  );
};

export const PUT = async (req: NextRequest) => {
  console.log("req: ", req);
  await db();
  const data: IEvent = await req.json();
  console.log("data: PUT", data);

  const response = await event.findByIdAndUpdate(data._id, data, { new: true });
  console.log("response:PUT ", response);

  if (!response) {
    return NextResponse.json(
      { message: "Event was not updated", ok: false },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { message: "Event was updated", ok: true, body: response },
    { status: 200 }
  );
};

export const DELETE = async (req: NextRequest) => {
  await db();

  const id = await req.json();

  const response = await event.findByIdAndDelete(id);

  if (!response) {
    return NextResponse.json(
      { message: "Event was not deleted", ok: false },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { message: "Event was deleted", ok: true, body: response },
    { status: 200 }
  );
};
