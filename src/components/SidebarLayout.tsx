"use client";
import { useState, useEffect, ReactNode, Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface SidebarLayoutProps {
  tabs: { label: string; content: ReactNode }[];
}

export default function SidebarLayout({ tabs }: SidebarLayoutProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = () => setOpen(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex h-screen">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-l-xl bg-blue-200 hover:bg-slate-200 transition-colors"
      >
        {open ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {open && (
        <aside
          className={`
            relative flex flex-col bg-slate-100 text-slate-800
            transition-[width] duration-300 ease-in-out overflow-hidden
            ${open ? "w-64" : "w-0"} md:w-64`}
        >
          {tabs.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`
            flex tabs-center px-4 py-3 whitespace-nowrap
            transition-colors duration-200
            ${
              active === idx
                ? "bg-white text-yellow-500 font-medium border-r-2 border-blue-600"
                : "hover:bg-slate-200/50"
            }
          `}
            >
              {item.label}
            </button>
          ))}
        </aside>
      )}

      <main className="flex-1 p-6 overflow-auto bg-white">
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {tabs[active].content}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
