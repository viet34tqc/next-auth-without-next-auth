import { PostAndUsername, SortOption } from '@/components/posts/types'
import { prisma } from '@/lib/prisma'

export const getPosts = async (query?: string, sort?: SortOption): Promise<PostAndUsername[]> => {
  const q = query || ''

  // Define orderBy based on sort parameter
  const orderBy = sort === 'a-z' ? { title: 'asc' as const } : { createdAt: 'desc' as const }

  return prisma.post.findMany({
    where: q
      ? {
          OR: [{ title: { contains: q } }, { content: { contains: q } }],
        }
      : undefined,
    orderBy,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
