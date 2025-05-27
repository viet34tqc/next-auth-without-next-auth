import type { PostAndUsername, SortOption } from '@/components/posts/types'
import { getSortOrderBy } from '@/components/posts/utils'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'

export const getUserPosts = async (
  query?: string,
  sort?: SortOption,
  page: number = 1,
  limit: number = 10,
): Promise<{ posts: PostAndUsername[]; total: number }> => {
  const { session } = await getAuth()
  if (!session?.userId) throw new Error('Not authenticated')

  const q = query || ''
  const skip = (page - 1) * limit

  // Get the orderBy object based on the sort parameter
  const orderBy = getSortOrderBy(sort)

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
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
      skip,
      take: limit,
    }),
    prisma.post.count({
      where: {
        userId: session.userId,
        ...(q
          ? {
              OR: [{ title: { contains: q } }, { content: { contains: q } }],
            }
          : {}),
      },
    }),
  ])

  return { posts, total }
}
