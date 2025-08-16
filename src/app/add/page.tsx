"use client";
import SnippetForm, { SnippetFormData } from "@/components/SnippetForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (form: SnippetFormData) => {
    // Basic validation: require title and code
    if (!form.title?.trim() || !form.code?.trim()) {
      alert("Title and code are required.");
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };
    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("Failed to add snippet.");
        setLoading(false);
        return;
      }
      router.replace("/");
    } catch (error) {
      alert("An error occurred.");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Snippet</h1>
      <SnippetForm
        onSubmit={handleAdd}
        submitText={loading ? "Adding..." : "add"}
        disabled={loading}
      />
    </main>
  );
}
