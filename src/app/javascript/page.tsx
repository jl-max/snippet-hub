import TopbarLayout from "@/components/TopbarLayout";
import StickyNoteGrid from "@/components/StickyNote";

const labels = [
  "Object",
  "Function",
  "Extends",
  "Array",
  "Regular expression",
  "Method",
];

export default async function Foundation() {
  const tabs = labels.map((topic) => ({
    label: topic,
    content: <StickyNoteGrid label={topic} />,
  }));

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-yellow-400 pointer-events-none">
          JavaScript
        </h1>
      </div>
      <TopbarLayout tabs={tabs} />
    </div>
  );
}
