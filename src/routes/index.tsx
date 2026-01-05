// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import Home from '@/sections/Home'
import { createServerFn } from '@tanstack/react-start'

export type HomeApiResponse = {
  name: { first: string; last: string }
  keyfacts: Array<string | number>
  rotation: string[]
  technical: { identity: string; core_stack: string[] }
  phrase: string
}

// Runs on the server (TanStack Start)
export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const res = await fetch('https://cms.leonhardbreuer.de/api/home', {
    headers: { accept: 'application/json' },
    // If you ever need to avoid cached fetches:
    // cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch home data: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as HomeApiResponse
})

export const Route = createFileRoute('/')({
  // Prefetches before component renders / on navigation
  loader: async () => {
    return await getHomeData()
  },
  component: IndexPage,
})

function IndexPage() {
  const data = Route.useLoaderData()
  return <Home data={data} />
}
