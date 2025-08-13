"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "JavaScript", href: "/javascript" },
  { label: "React", href: "/framework" },
  { label: "Performance", href: "/performance" },
  { label: "About Author", href: "/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 text-white">
      {/* 外层不再限制高度 */}
      <div className="font-mono max-w-6xl mx-auto px-4 min-h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold m-2 hover:text-yellow-300">
          Snippets Hub
        </Link>

        {/* 桌面端 */}
        <nav className="hidden md:flex gap-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={
                isActive(href) ? "text-yellow-300" : "hover:text-yellow-300"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 手机端汉堡按钮 */}
        <div className="flex md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-slate-700"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* 下拉菜单：绝对定位，宽度同 header */}
        {open && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-slate-800 text-white ml-3 flex flex-col gap-2 p-4 z-50">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={
                  isActive(href) ? "text-yellow-300" : "hover:text-yellow-300"
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
