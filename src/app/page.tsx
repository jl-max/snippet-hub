import { SnippetModel } from "@/models/Snippet";
import { connectDB } from "@/lib/db";
import SnippetCard from "@/components/SnippetCard";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Snippet } from "@/interface/interfaces";

export default async function HomePage() {
  await connectDB();
  const snippets: Snippet[] = await SnippetModel.find().lean<Snippet[]>();

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
