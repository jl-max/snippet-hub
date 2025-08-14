import SidebarLayout from "@/components/SidebarLayout";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownViewer from "@/components/MarkdownViewer";

const labels = [
  "Data flow",
  "State management",
  "React Router",
  "CSS",
  "Optimization",
];

export default function Framwork() {
  const tabs = labels.map((topic) => ({
    label: topic,
    content: <MarkdownViewer topic={topic} />,
  }));
  tabs.unshift({ label: "Add Note", content: <MarkdownEditor /> });

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-blue-400 pointer-events-none">
          React
        </h1>
      </div>
      <SidebarLayout items={tabs} />
    </div>
  );
}
