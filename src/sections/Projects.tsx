import * as React from 'react'
import { useStore } from '@tanstack/react-store'
import { appStore } from '@/lib/store'
import { ProjectsApiResponse } from '@/routes/projects'
import { ProjectCard } from '@/components/Project' // Import here

export default function Projects({ data }: { data: ProjectsApiResponse }) {
  const focusMode = useStore(appStore, (s) => s.focusMode)
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredProjects = React.useMemo(
    () => data.projects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, data.projects],
  )

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ... header and input code ... */}
      <div className="space-y-1">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} focusMode={focusMode} />
        ))}
      </div>
    </div>
  )
}
