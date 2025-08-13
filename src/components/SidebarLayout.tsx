"use client";
import { useState, ReactNode } from "react";

interface SidebarLayoutProps {
  items: { label: string; content: ReactNode }[];
}

export default function SidebarLayout({ items }: SidebarLayoutProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* 左侧导航 */}
      <aside
        className={`
        relative          /* 让按钮绝对定位相对于它 */
        flex flex-col bg-slate-100 text-slate-800
        transition-all duration-300 ease-in-out
        ${open ? "w-64" : "w-20"}
      `}
      >
        {/* 所有菜单选项 */}
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`
            px-4 py-3 text-left transition-colors
            ${
              active === idx
                ? "bg-white text-yellow-500 border-r-2 border-blue-600"
                : "hover:bg-slate-200"
            }
            ${open ? "" : "justify-center"}  /* 收起时文字居中 */
          `}
          >
            {open ? item.label : ""}
          </button>
        ))}

        {/* 圆形按钮：固定在左下角 */}
        <button
          onClick={() => setOpen(!open)}
          className="
          float top-4 left-4           /* 左下角 */
          w-10 h-10 rounded-full bg-blue-600
          text-white flex items-center justify-center
          hover:bg-blue-700 transition-colors
          shadow-md
        "
        >
          {open ? "‹" : "›"} {/* 或 ← / → */}
        </button>
      </aside>

      {/* 右侧内容保持不变 */}
      <main className="flex-1 p-6 overflow-auto bg-white">
        {items[active].content}
      </main>
    </div>
  );
}
