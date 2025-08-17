import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { NoteModel } from "@/models/Note";

export async function GET() {
  await connectDB();

  try {
    const notes = await NoteModel.find().lean();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json().catch(() => null);
  if (
    !body ||
    typeof body.topic !== "string" ||
    typeof body.content !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid JSON or missing fields" },
      { status: 400 }
    );
  }

  const { topic, content } = body;

  try {
    const created = await NoteModel.create({ topic, content });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
