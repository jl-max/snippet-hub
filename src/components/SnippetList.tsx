import { getSnippets } from "@/lib/db";
import SnippetCard from "@/components/SnippetCard";

export async function SnippetList() {
  const snippets = await getSnippets();
  return (
    <div>
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
  );
}