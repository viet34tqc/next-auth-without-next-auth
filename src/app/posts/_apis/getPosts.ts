import { DEFAULT_PAGE_SIZE } from '@/components/posts/constants'
import type { PostAndUsername, SortOption } from '@/components/posts/types'
import { getSortOrderBy } from '@/components/posts/utils'
import { prisma } from '@/lib/prisma'

export const getPosts = async (
  query?: string,
  sort?: SortOption,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<{ posts: PostAndUsername[]; total: number }> => {
  const q = query || ''
  const skip = (page - 1) * limit

  // Get the orderBy object based on the sort parameter
  const orderBy = getSortOrderBy(sort)

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: q
        ? {
            OR: [{ title: { contains: q } }, { content: { contains: q } }],
          }
        : undefined,
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
      where: q
        ? {
            OR: [{ title: { contains: q } }, { content: { contains: q } }],
          }
        : undefined,
    }),
  ])

  return { posts, total }
}
