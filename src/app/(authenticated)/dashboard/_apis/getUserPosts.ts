import type { PostAndUsername, SortOption } from '@/components/posts/types'
import { getSortOrderBy } from '@/components/posts/utils'
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

  // Get the orderBy object based on the sort parameter
  const orderBy = getSortOrderBy(sort)

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
