import { blogPostQuery } from '@/queries/blogPost'
import BlogPost from '@/sections/BlogPost'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(blogPostQuery(params.postId))
  },
  component: BlogPost,
})
