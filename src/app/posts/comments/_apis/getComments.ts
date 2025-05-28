import { DEFAULT_COMMENT_PAGE_SIZE } from '@/components/comments/constants'
import type { CommentSortOption, CommentWithUser } from '@/components/comments/types'
import { getCommentSortOrderBy } from '@/components/comments/utils'
import { prisma } from '@/lib/prisma'

export const getComments = async (
  postId: string,
  sort: CommentSortOption = 'newest',
  page: number = 1,
  limit: number = DEFAULT_COMMENT_PAGE_SIZE,
): Promise<{ comments: CommentWithUser[]; total: number }> => {
  const orderBy = getCommentSortOrderBy(sort)
  const skip = (page - 1) * limit

  const [comments, total] = await prisma.$transaction([
    prisma.comment.findMany({
      where: {
        postId,
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
    prisma.comment.count({
      where: {
        postId,
      },
    }),
  ])

  return { comments, total }
}
