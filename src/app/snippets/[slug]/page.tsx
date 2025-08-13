import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { SnippetModel } from "@/models/Snippet";
import CodeBlock from "@/components/CodeBlock";
import ActionButtons from '@/components/ActionButtons'

type Props = { params: { slug: string } };

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const snippet = await SnippetModel.findOne({ slug }).lean();

  if (!snippet) notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{snippet.title}</h1>
      <p className="mb-4 text-slate-600">{snippet.description}</p>

      <div className="mb-4 flex gap-2">
        {snippet.tags.map((t) => (
          <span
            key={t}
            className="text-xs rounded-full bg-indigo-100 px-2 py-1 text-indigo-700"
          >
            {t}
          </span>
        ))}
      </div>

      <CodeBlock language={snippet.language} code={snippet.code} />
      <ActionButtons slug={snippet.slug} />
    </main>
  );
}
