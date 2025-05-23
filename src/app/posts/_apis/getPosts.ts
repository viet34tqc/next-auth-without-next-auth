import type { PostAndUsername, SortOption } from '@/components/posts/types'
import { getSortOrderBy } from '@/components/posts/utils'
import { prisma } from '@/lib/prisma'

export const getPosts = async (query?: string, sort?: SortOption): Promise<PostAndUsername[]> => {
  const q = query || ''

  // Get the orderBy object based on the sort parameter
  const orderBy = getSortOrderBy(sort)

  return prisma.post.findMany({
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
  })
}
