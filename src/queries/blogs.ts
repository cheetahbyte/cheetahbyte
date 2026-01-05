export type BlogListItem = {
  id: string
  title: string
  date: string
  tags: string[]
}

type BlogListResponse = {
  blogs: BlogListItem[]
}

export const blogsQuery = {
  queryKey: ['blogs'],
  queryFn: async (): Promise<BlogListItem[]> => {
    const res = await fetch('https://cms.leonhardbreuer.de/api/blogs')
    if (!res.ok) throw new Error('Failed to load blogs')
    const data = (await res.json()) as BlogListResponse
    return data.blogs
  },
  staleTime: 1000 * 60 * 5, // 5 Minuten Cache
}
