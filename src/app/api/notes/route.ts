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
  const { topic, content } = await req.json();

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
