import { ArrowRight } from 'lucide-react'
import { ProjectsApiResponse } from '@/routes/projects'

interface ProjectCardProps {
  project: ProjectsApiResponse['projects'][number]
  focusMode: boolean
}

export const ProjectCard = ({ project, focusMode }: ProjectCardProps) => {
  return (
    <a
      href={project.link}
      className={`group flex items-center justify-between py-6 px-4 transition-all duration-300 cursor-pointer border-b ${
        focusMode
          ? 'border-white/[0.05] hover:bg-white/[0.03]'
          : 'border-black/[0.03] hover:bg-[#F3F4F6]'
      }`}
    >
      <div className="flex-1">
        {/* Title and Tag Row */}
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className={`text-xl font-medium transition-transform group-hover:translate-x-1 ${
            focusMode ? 'text-white' : 'text-black'
          }`}>
            {project.name}
          </h3>

          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded shrink-0 ${
            focusMode
              ? 'bg-white/10 text-white/60'
              : 'bg-[#0E4D47]/5 text-[#0E4D47]'
          }`}>
            {project.tag}
          </span>
        </div>

        {/* Description Row */}
        <p className={`text-sm mt-2 max-w-2xl font-sans ${
          focusMode ? 'text-white/40' : 'text-gray-500'
        }`}>
          description
        </p>
      </div>

      <ArrowRight
        className={`transition-all shrink-0 ${
          focusMode
            ? 'text-white opacity-0 group-hover:opacity-100'
            : 'text-[#0E4D47] opacity-0 group-hover:opacity-100'
        }`}
        size={20}
      />
    </a>
  )
}
