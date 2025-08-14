import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SnippetModel } from "@/models/Snippet";

/* GET /api/snippets/:slug   → 查单条详情 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();
  const { slug } = await params;
  const snippet = await SnippetModel.findOne({ slug }).lean();
  if (!snippet)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(snippet);
}

/* PUT /api/snippets/:slug   → 更新片段 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();
  const { slug } = await params;
  const body = await req.json();

  const updated = await SnippetModel.findOneAndUpdate({ slug }, body, {
    new: true,
  });
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

/* DELETE /api/snippets/:slug → 删除片段 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();
  const { slug } = await params;
  const result = await SnippetModel.deleteOne({ slug });
  if (result.deletedCount === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
