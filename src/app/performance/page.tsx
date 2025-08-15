import TopbarLayout from "@/components/TopbarLayout";
import StickyNoteGrid from "@/components/StickyNote";

const labels = [
  "Compressing",
  "Reducing",
  "Caching",
  "Rendering",
  "Monitoring",
];

export default async function Performance() {
  const tabs = labels.map((topic) => ({
    label: topic,
    content: <StickyNoteGrid label={topic} noteBgColor="bg-green-100"/>,
  }));

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex flex-col items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-green-400 pointer-events-none">
          Performance
        </h1>
        <h6 className="font-mono text-sm text-green-600 mt-2">
          resources downloading | page parsing
        </h6>
      </div>
      <TopbarLayout tabs={tabs} />
    </div>
  );
}
