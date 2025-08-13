"use client";

import { useState } from "react";

export type SnippetFormData = {
  title: string;
  language: string;
  tags: string;
  description: string;
  code: string;
};

type Props = {
  initialData?: SnippetFormData;
  onSubmit: (data: SnippetFormData) => Promise<void> | void;
  submitText?: string;
};

export default function SnippetForm({
  initialData,
  onSubmit,
  submitText = "save",
}: Props) {
  const [form, setForm] = useState<SnippetFormData>(
    initialData ?? {
      title: "",
      language: "typescript",
      tags: "",
      description: "",
      code: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <SelectField
        label="Language"
        name="language"
        value={form.language}
        onChange={handleChange}
      >
        <option value="typescript">TypeScript</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="bash">Bash</option>
      </SelectField>
      <InputField
        label="Tags (separate with,)"
        name="tags"
        value={form.tags}
        onChange={handleChange}
      />
      <TextAreaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={2}
      />
      <TextAreaField
        label="Code"
        name="code"
        value={form.code}
        onChange={handleChange}
        rows={10}
        required
      />

      <button
        type="submit"
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        {submitText}
      </button>
    </form>
  );
}

/* 小小工具组件，按需复制 */
const InputField = ({ label, ...props }: any) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      {...props}
      className="w-full rounded border border-slate-300 px-3 py-2"
    />
  </div>
);

const SelectField = ({ label, children, ...props }: any) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      {...props}
      className="w-full rounded border border-slate-300 px-3 py-2"
    >
      {children}
    </select>
  </div>
);

const TextAreaField = ({ label, ...props }: any) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <textarea
      {...props}
      className="w-full rounded border border-slate-300 px-3 py-2 font-mono"
    />
  </div>
);
