'use server'

import { prisma } from '@/lib/prisma'

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  })
}
