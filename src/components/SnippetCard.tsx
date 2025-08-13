import Link from 'next/link'

type Props = {
  snippet: import('@/lib/snippets').Snippet
}

export default function SnippetCard({ snippet }: Props) {
  return (
    <Link
      href={`/snippets/${snippet.slug}`}
      className="block rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
    >
      <h2 className="text-lg font-bold text-slate-900">{snippet.title}</h2>
      <p className="mt-1 text-sm text-slate-600 line-clamp-3">{snippet.description}</p>
      <div className="mt-2 flex gap-2">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}