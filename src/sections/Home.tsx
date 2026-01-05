// src/sections/Home.tsx
import { useStore } from '@tanstack/react-store'
import { appStore } from '@/lib/store'
import { MapPin, Github, Mail } from 'lucide-react'
import TerminalText from '@/components/TerminalText'
import type { HomeApiResponse } from '@/routes/index'

function formatKeyfacts(keyfacts: HomeApiResponse['keyfacts']) {
  return keyfacts.map(String).join(' // ')
}

export default function Home({ data }: { data: HomeApiResponse }) {
  const focusMode = useStore(appStore, (s) => s.focusMode)

  const fullName = `${data.name.first} ${data.name.last}`
  const keyfactsLine = formatKeyfacts(data.keyfacts)
  const coreStack = data.technical.core_stack.join(', ')

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${
        focusMode ? 'text-center min-h-[calc(100vh-8rem)] flex flex-col justify-center' : ''
      }`}
    >
      <section className={`${focusMode ? 'mb-0' : 'mb-32'}`}>
        {!focusMode && (
          <div className="flex items-center gap-2 mb-6">
            <MapPin size={14} className="text-[#0E4D47]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {keyfactsLine}
            </span>
          </div>
        )}

        <h1
          className={`text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.85] transition-colors ${
            focusMode ? 'text-white' : 'text-[#1A1A1A]'
          }`}
        >
          {data.name.first} <br />
          <span className={`italic transition-colors ${focusMode ? 'text-white/60' : 'text-[#0E4D47]'}`}>
            {data.name.last}.
          </span>
        </h1>

        <div className={`text-xl font-mono leading-relaxed ${focusMode ? 'mx-auto' : 'max-w-2xl'}`}>
          <TerminalText isFocus={focusMode} texts={data.rotation} />
        </div>

        {focusMode && data.phrase && (
          <p className="mt-10 text-sm font-mono text-white/50 max-w-xl mx-auto">
            “{data.phrase}”
          </p>
        )}
      </section>

      {!focusMode && (
        <section className="grid md:grid-cols-2 gap-12 border-t pt-12 transition-colors border-black/[0.03]">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6 underline decoration-[#0E4D47] underline-offset-4">
              Technical Profile
            </h2>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex justify-between border-b pb-1 border-black/[0.02]">
                <span>Identity:</span> <span className="text-[#0E4D47]">{data.technical.identity || fullName}</span>
              </li>
              <li className="flex justify-between border-b pb-1 border-black/[0.02]">
                <span>Core Stack:</span> <span className="text-[#0E4D47]">{coreStack}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {data.phrase ? (
                <>
                  <span className="text-gray-400">Current phrase:</span> “{data.phrase}”
                </>
              ) : (
                'Dedicated to the intersection of clean architecture and minimalist design. Building systems that respect focus.'
              )}
            </p>

            <div className="flex gap-4">
              {/* Swap these for your real links */}
              <a
                href="https://github.com/cheetahbyte"
                target="_blank"
                rel="noreferrer"
                className="p-2 border transition-colors rounded border-black/5 hover:border-[#0E4D47]"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>

              <a
                href="mailto:hello@leonhardbreuer.de"
                className="p-2 border transition-colors rounded border-black/5 hover:border-[#0E4D47]"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
