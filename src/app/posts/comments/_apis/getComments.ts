import { COMMENT_MAX_DEPTH, DEFAULT_COMMENT_PAGE_SIZE } from '@/components/comments/constants'
import type { CommentSortOption, CommentWithUser } from '@/components/comments/types'
import { buildCommentTree } from '@/components/comments/utils'
import { prisma } from '@/lib/prisma'

type GetCommentsParams = {
  postId: string
  sort?: CommentSortOption
  page?: number
  limit?: number
}

export const getComments = async ({
  postId,
  sort = 'newest',
  page = 1,
  limit = DEFAULT_COMMENT_PAGE_SIZE,
}: GetCommentsParams): Promise<{ comments: CommentWithUser[]; total: number }> => {
  // Instead of fetching the nested comments in this query
  // I fetch all comments for the post first
  const allComments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  // Then I build the comment tree from flat data
  // The comment tree will have the hierarchy that we want
  const commentTree = buildCommentTree(allComments, COMMENT_MAX_DEPTH)

  // Because we fetched all comments, we need to sort them manually, but only top-level comments
  if (sort === 'newest') {
    commentTree.sort(
      (a: CommentWithUser, b: CommentWithUser) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } else {
    commentTree.sort(
      (a: CommentWithUser, b: CommentWithUser) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
  }

  // Apply pagination to top-level comments only
  const skip = (page - 1) * limit
  const paginatedComments = commentTree.slice(skip, skip + limit)
  const total = commentTree.length

  return { comments: paginatedComments, total }
}
