import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useQuery } from '@tanstack/react-query'

import { appStore } from '@/lib/store'
import { blogsQuery } from '@/queries/blogs'

export default function Blog() {
  const focusMode = useStore(appStore, (s) => s.focusMode)
  const { data: blogs = [], isLoading, isError, error } = useQuery(blogsQuery)
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredBlogs = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return blogs
    return blogs.filter((b) => b.title.toLowerCase().includes(q))
  }, [blogs, searchQuery])

  if (isLoading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2
          className={`font-mono text-sm border-b pb-2 uppercase tracking-tighter ${
            focusMode ? 'border-white/10' : 'border-black/10'
          }`}
        >
          Technical Logs
        </h2>
        <div className="mt-6 font-mono text-xs opacity-60">Loading…</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2
          className={`font-mono text-sm border-b pb-2 uppercase tracking-tighter ${
            focusMode ? 'border-white/10' : 'border-black/10'
          }`}
        >
          Technical Logs
        </h2>
        <div className="mt-6 font-mono text-xs opacity-60">
          Failed to load blogs{error instanceof Error ? `: ${error.message}` : '.'}
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2
          className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter flex-1 ${
            focusMode ? 'border-white/10' : 'border-black/10'
          }`}
        >
          Technical Logs
        </h2>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search…"
          className={`font-mono text-xs px-3 py-2 rounded border outline-none transition-colors ${
            focusMode
              ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20'
              : 'bg-white border-black/10 text-black placeholder:text-black/30'
          }`}
        />
      </div>

      <div className="space-y-8">
        {filteredBlogs.length === 0 ? (
          <div className="font-mono text-xs opacity-60">No posts found.</div>
        ) : (
          filteredBlogs.map((post) => (
            <Link
              preload="intent"
              key={post.id}
              to="/blog/$postId"
              params={{ postId: post.id }}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 group cursor-pointer"
            >
              <span className="font-mono text-xs text-gray-400 shrink-0">{post.date}</span>

              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold transition-colors ${
                    focusMode ? 'text-white/80 group-hover:text-white' : 'group-hover:text-[#0E4D47]'
                  }`}
                >
                  {post.title}
                </h3>

                <ul className="flex flex-row gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <li
                      key={`${post.id}:${t}`}
                      className={`inline-block mt-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                        focusMode ? 'bg-white/10 text-white/60' : 'bg-[#0E4D47]/5 text-[#0E4D47]'
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
