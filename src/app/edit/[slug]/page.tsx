"use client";
import { useEffect, useState } from "react";
import SnippetForm, { SnippetFormData } from "@/components/SnippetForm";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [initial, setInitial] = useState<SnippetFormData | null>(null);

  useEffect(() => {
    fetch(`/api/snippets/${slug}`)
      .then((r) => r.json())
      .then((d) =>
        setInitial({
          title: d.title,
          language: d.language,
          tags: d.tags?.join(", ") ?? "",
          description: d.description ?? "",
          code: d.code,
        })
      );
  }, [slug]);

  const handleSave = async (form: SnippetFormData) => {
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    await fetch(`/api/snippets/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.replace(`/snippets/${slug}`);
  };

  if (!initial) return <p className="p-6">loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Snippet</h1>
      <SnippetForm
        initialData={initial}
        onSubmit={handleSave}
        submitText="save"
      />
    </main>
  );
}
