import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Clock, Share2 } from 'lucide-react'

import { appStore } from '@/lib/store'
import { Route } from '@/routes/blog/$postId'
import { blogPostQuery } from '@/queries/blogPost'

export default function BlogPost() {
  const focusMode = useStore(appStore, (s) => s.focusMode)
  const { postId } = Route.useParams()

  // loader already ensured it, so this should be instant
  const { data: post } = useQuery(blogPostQuery(postId))

  if (!post) return null // should basically never happen if loader ran

  const category = post.tags?.[0] ?? 'General'

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link
        to="/blog"
        className={`flex items-center gap-2 font-mono text-xs mb-12 uppercase tracking-widest transition-colors ${
          focusMode ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-[#0E4D47]'
        }`}
      >
        <ChevronLeft size={14} /> Back to Logs
      </Link>

      <article className={focusMode ? 'max-w-2xl mx-auto' : ''}>
        <header className="mb-16">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
            <span className={focusMode ? 'text-white/60' : 'text-[#0E4D47]'}>{post.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1">
              <Clock size={10} /> 5 MIN READ
            </div>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight ${focusMode ? 'text-white' : ''}`}>
            {post.title}
          </h1>

          <div className={`h-px w-24 bg-[#0E4D47] ${focusMode ? 'bg-white/20' : ''}`} />
        </header>

        <div className={`prose prose-slate max-w-none font-sans text-lg leading-relaxed space-y-8 ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {(post.content ?? '').split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer className={`mt-20 pt-12 border-t flex justify-between items-center ${focusMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex gap-4">
            <button className={`p-2 rounded transition-colors ${focusMode ? 'hover:bg-white/5' : 'hover:bg-black/5 text-gray-400'}`}>
              <Share2 size={16} />
            </button>
          </div>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">End of Entry</span>
        </footer>
      </article>
    </div>
  )
}
