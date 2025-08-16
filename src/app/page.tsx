import Link from "next/link";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { SnippetList } from "@/components/SnippetList";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Snippet Gallery</h1>
        <Link
          href="/add"
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={14} />
          new
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SnippetList />
      </Suspense>
    </main>
  );
}
