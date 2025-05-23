import { SORT_OPTIONS } from './constants'
import { SortOption } from './types'

/**
 * Get the orderBy configuration for a given sort option
 * @param sort The sort option to use
 * @returns Prisma orderBy configuration
 */
export const getSortOrderBy = (sort?: SortOption) => {
  return sort ? SORT_OPTIONS[sort].orderBy : SORT_OPTIONS.newest.orderBy
}
