"use client";
import SnippetForm, { SnippetFormData } from "@/components/SnippetForm";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();

  const handleAdd = async (form: SnippetFormData) => {
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    await fetch("/api/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.replace("/");
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Snippet</h1>
      <SnippetForm onSubmit={handleAdd} submitText="add" />
    </main>
  );
}
