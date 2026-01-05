import { createFileRoute } from '@tanstack/react-router'
import { blogsQuery } from '@/queries/blogs'
import BlogList from '@/sections/Blog'

export const Route = createFileRoute('/blog/')({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(blogsQuery)
  },
  component: BlogList,
})
