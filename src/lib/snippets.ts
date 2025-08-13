export type Snippet = {
  slug: string;
  title: string;
  language: string;
  tags: string[];
  code: string;
  description?: string;
};

export const snippets: Snippet[] = [
  {
    slug: "debounce-ts",
    title: "Debounce in TypeScript",
    language: "typescript",
    tags: ["utility", "performance"],
    description: "防抖函数，用于输入框等高频事件",
    code: `export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}`,
  },
  {
    slug: "use-local-storage",
    title: "React useLocalStorage Hook",
    language: "typescript",
    tags: ["react", "hooks"],
    description: "同步 localStorage 的状态 Hook",
    code: `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}`,
  },
];

export const getAllSnippets = () => snippets

export const getSnippet = (slug: string) =>
  getAllSnippets().find((s: Snippet) => s.slug === slug);
