import { COMMENT_SORT_OPTIONS } from './constants'
import { CommentSortOption } from './types'

/**
 * Get the orderBy configuration for a given comment sort option
 * @param sort The sort option to use
 * @returns Prisma orderBy configuration
 */
export const getCommentSortOrderBy = (sort?: CommentSortOption) => {
  return sort ? COMMENT_SORT_OPTIONS[sort].orderBy : COMMENT_SORT_OPTIONS.newest.orderBy
}
