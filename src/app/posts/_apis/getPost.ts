import { prisma } from '@/lib/prisma'

export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  })
}
