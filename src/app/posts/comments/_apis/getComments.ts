import { COMMENT_SORT_OPTIONS } from '@/components/comments/constants'
import type { CommentWithUser, CommentSortOption } from '@/components/comments/types'
import { prisma } from '@/lib/prisma'

export const getComments = async (
  postId: string,
  sort: CommentSortOption = 'newest',
): Promise<CommentWithUser[]> => {
  const sortConfig = COMMENT_SORT_OPTIONS[sort]

  return prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: sortConfig.orderBy,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
