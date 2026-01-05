import { createFileRoute } from '@tanstack/react-router'
import Projects from '@/sections/Projects'
import { createServerFn } from '@tanstack/react-start'
import Home from '@/sections/Home'

export type Project = {
  name: string,
  tag: string
  link: string
}

export type ProjectsApiResponse = {
  projects: Array<Project>
}

export const getProjectData = createServerFn({ method: 'GET' }).handler(async () => {
  const res = await fetch('https://cms.leonhardbreuer.de/api/projects', {
    headers: { accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch projects data: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as ProjectsApiResponse
})

function ProjectsPage() {
  const data = Route.useLoaderData()
  return <Projects data={data} />
}

export const Route = createFileRoute('/projects')({
  loader: async () => {
    return await getProjectData()
  },
  component: ProjectsPage,
})
