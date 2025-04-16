import { prisma } from '@/lib/prisma'
import { PostType } from '../_types'

export const getPosts = async (): Promise<PostType[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
