/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SnippetCard from "@/components/SnippetCard";
import { useSnippetsSWR } from "@/hooks/useGet";

export function SnippetList() {
  const { snippets, error, isLoading } = useSnippetsSWR();

  if (isLoading) return <p className="p-6">loading…</p>;
  if (error) return <p className="p-6 text-red-600">Error loading snippet.</p>;
  if (!snippets) return null;

  return (
    <div>
      {snippets.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500">
          No snippets yet, go add!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {snippets.map((s:any) => (
            <SnippetCard key={s.slug} snippet={s} />
          ))}
        </div>
      )}
    </div>
  );
}
