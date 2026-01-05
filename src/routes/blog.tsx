import { blogsQuery } from '@/queries/blogs'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  loader: async ({ context }) => {
      return context.queryClient.ensureQueryData(blogsQuery)
  },
  component: () => <Outlet />,
})
