"use client";
import SnippetForm, { SnippetFormData } from "@/components/SnippetForm";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { useSnippetSWR } from "@/hooks/useGet";

export default function EditPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const { snippet, error, isLoading } = useSnippetSWR(slug);
  const [saving, setSaving] = useState(false);

  const handleSave = async (form: SnippetFormData) => {
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    setSaving(true);
    const res = await fetch(`/api/snippets/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      router.replace(`/snippets/${slug}`);
    } else {
      alert("Failed to save snippet.");
    }
  };

  if (isLoading) return <p className="p-6">loading…</p>;
  if (error) return <p className="p-6 text-red-600">Error loading snippet.</p>;
  if (!snippet) return null;

  const initial: SnippetFormData = {
    title: snippet.title,
    language: snippet.language,
    tags: snippet.tags?.join(", ") ?? "",
    description: snippet.description ?? "",
    code: snippet.code,
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Snippet</h1>
      <SnippetForm
        initialData={initial}
        onSubmit={handleSave}
        submitText={saving ? "Saving..." : "save"}
        disabled={saving}
      />
    </main>
  );
}
