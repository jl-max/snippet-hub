"use client";

import { useRouter } from "next/navigation";
import { Trash2, Edit3 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";

export default function ActionButtons({ slug }: { slug: string }) {
  const router = useRouter();
  const { loading, error, execute: doDelete } = useFetch(
    `/api/snippets/${slug}`,
    { method: "DELETE" },
    true
  );

  const handleDelete = async () => {
    if (!confirm("Sure to delete?")) return;
    try {
      await doDelete();
      router.push("/");
    } catch {
      alert("An error occurred.");
    }
  };

  const handleEdit = () => router.push(`/edit/${slug}`);

  return (
    <div className="mt-6 flex gap-2 justify-end">
      <button
        type="button"
        aria-label="Delete snippet"
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        <Trash2 size={14} /> {loading ? "deleting..." : "delete"}
      </button>
      <button
        type="button"
        aria-label="Edit snippet"
        onClick={handleEdit}
        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        <Edit3 size={14} /> edit
      </button>
      {error && <span className="text-red-600 ml-2 text-sm">{error}</span>}
    </div>
  );
}
