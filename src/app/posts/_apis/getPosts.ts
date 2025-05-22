import { PostAndUsername } from '@/components/posts/types'
import { prisma } from '@/lib/prisma'

export const getPosts = async (): Promise<PostAndUsername[]> => {
  return prisma.post.findMany({
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
