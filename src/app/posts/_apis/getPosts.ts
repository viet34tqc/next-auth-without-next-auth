import { PostAndUsername } from '@/components/posts/types'
import { prisma } from '@/lib/prisma'

export const getPosts = async (query?: string): Promise<PostAndUsername[]> => {
  const q = query || ''

  return prisma.post.findMany({
    where: q
      ? {
          OR: [{ title: { contains: q } }, { content: { contains: q } }],
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
