/* eslint-disable @typescript-eslint/no-explicit-any */
import { SnippetModel } from "@/models/Snippet";
import { connectDB } from "@/lib/db";
import SnippetCard from "@/components/SnippetCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function HomePage() {
  await connectDB();
  const rawSnippets = await SnippetModel.find().lean();
  const snippets: import("@/lib/snippets").Snippet[] = rawSnippets.map(
    (s: any) => ({
      slug: s.slug,
      title: s.title,
      language: s.language,
      description: s.description,
      tags: s.tags,
      code: s.code,
    })
  );
  // const snippets = getAllSnippets();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Snippet Gallery</h1>
        <Link
          href="/add"
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={14} />
          new
        </Link>
      </div>
      <div className="mt-6">
        {snippets.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-slate-500">
            No snippets yet, go add!
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {snippets.map((s) => (
              <SnippetCard key={s.slug} snippet={s} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
