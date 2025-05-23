import { PostAndUsername, SortOption } from '@/components/posts/types'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'

export const getUserPosts = async (
  query?: string,
  sort?: SortOption,
): Promise<PostAndUsername[]> => {
  // Get the current user session
  const { session } = await getAuth()
  const q = query || ''

  if (!session) {
    return []
  }

  // Define orderBy based on sort parameter
  const orderBy = sort === 'a-z' ? { title: 'asc' as const } : { createdAt: 'desc' as const }

  return prisma.post.findMany({
    where: {
      userId: session.userId,
      ...(q
        ? {
            OR: [{ title: { contains: q } }, { content: { contains: q } }],
          }
        : {}),
    },
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
