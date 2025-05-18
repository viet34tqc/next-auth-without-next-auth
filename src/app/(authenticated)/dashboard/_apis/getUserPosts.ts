import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { PostAndUsername } from '@/app/posts/_types'

export const getUserPosts = async (): Promise<PostAndUsername[]> => {
  // Get the current user session
  const { session } = await getAuth()

  if (!session) {
    return []
  }

  return prisma.post.findMany({
    where: {
      userId: session.userId,
    },
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
