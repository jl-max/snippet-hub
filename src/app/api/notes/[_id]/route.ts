import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { NoteModel } from "@/models/Note";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  await connectDB();
  const { _id } = await params;
  const result = await NoteModel.deleteOne({ _id });
  if (result.deletedCount === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
