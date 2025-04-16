import { prisma } from '@/lib/prisma'
import { Post } from '@prisma/client'

export const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
