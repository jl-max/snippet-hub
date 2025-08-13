// src/app/api/snippets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SnippetModel } from "@/models/Snippet";

/* GET /api/snippets   → 查全部片段 */
export async function GET() {
  await connectDB();
  const snippets = await SnippetModel.find().lean();
  return NextResponse.json(snippets);
}

/* POST /api/snippets  → 新增片段 */
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  // 自动 slug
  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const created = await SnippetModel.create({ ...body, slug });
  return NextResponse.json(created, { status: 201 });
}
