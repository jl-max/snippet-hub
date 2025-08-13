"use client";

import { useRouter } from "next/navigation";
import { Trash2, Edit3 } from "lucide-react";

export default function ActionButtons({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Sure to delete?")) return;
    await fetch(`/api/snippets/${slug}`, { method: "DELETE" });
    router.push("/");
  };

  const handleEdit = () => router.push(`/edit/${slug}`);

  return (
    <div className="mt-6 flex gap-2 justify-end">
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        <Trash2 size={14} /> delete
      </button>
      <button
        onClick={handleEdit}
        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        <Edit3 size={14} /> edit
      </button>
    </div>
  );
}
