import TopTabs from "@/components/TopTabs";
import StickyNoteGrid from "@/components/StickyNote";

export default async function Foundation() {
  const tabs = [
    {
      label: "Object",
      content: <StickyNoteGrid label="Object"/>,
    },
    { label: "Function", content: <StickyNoteGrid label="Function"/> },
    { label: "Extends", content: <StickyNoteGrid label="Extends"/> },
    { label: "Array", content: <StickyNoteGrid label="Array"/> },
    { label: "Regular expression", content: <StickyNoteGrid label="Regular expression"/> },
    { label: "Method", content: <StickyNoteGrid label="Method"/> },
  ];

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-yellow-400 pointer-events-none">
          JavaScript
        </h1>
      </div>
      <TopTabs tabs={tabs} />
    </div>
  );
}
