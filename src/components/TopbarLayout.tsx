"use client";
import { useState, ReactNode, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TopbarLayoutProps {
  tabs: TabItem[];
}

export default function TopbarLayout({ tabs }: TopbarLayoutProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none flex flex-wrap justify-center w-full border-b border-slate-300 bg-white rounded-t-xl">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`
              font-mono
              px-4 py-3 -mb-px
              text-base font-medium
              border-b-2
              transition-colors
              focus:outline-none
              ${
                active === idx
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-blue-600 hover:border-blue-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 bg-white">
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {tabs[active].content}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
