import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { slugify } from "transliteration";
import { SnippetModel } from "@/models/Snippet";

export async function GET() {
  await connectDB();
  const snippets = await SnippetModel.find().lean();
  return NextResponse.json(snippets);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const slug = slugify(body.title, { lowercase: true, separator: "-" });

  const created = await SnippetModel.create({ ...body, slug });
  return NextResponse.json(created, { status: 201 });
}
