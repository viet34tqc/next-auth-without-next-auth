import { prisma } from '@/lib/prisma'
import { PostAndUsername } from '../_types'

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
