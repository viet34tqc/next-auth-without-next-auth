import { PostAndUsername } from '@/components/posts/types'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'

export const getUserPosts = async (query?: string): Promise<PostAndUsername[]> => {
  // Get the current user session
  const { session } = await getAuth()
  const q = query || ''

  if (!session) {
    return []
  }

  return prisma.post.findMany({
    where: {
      userId: session.userId,
      ...(q
        ? {
            OR: [{ title: { contains: q } }, { content: { contains: q } }],
          }
        : {}),
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
