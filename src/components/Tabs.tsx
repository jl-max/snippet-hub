"use client";
import { useState, ReactNode } from "react";

type TabItem = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-96 border border-slate-300 rounded-md overflow-hidden">
      <nav className="w-48 flex flex-col bg-slate-100">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`px-4 py-3 text-left transition-colors
              ${
                active === idx
                  ? "bg-white text-blue-600 border-r border-blue-600"
                  : "hover:bg-slate-200"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-4 overflow-auto bg-white">
        {tabs[active].content}
      </main>
    </div>
  );
}
