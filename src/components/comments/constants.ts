import { CommentSortConfig } from './types'

export const COMMENT_SORT_OPTIONS: Record<string, CommentSortConfig> = {
  newest: {
    label: 'Newest First',
    value: 'newest',
    orderBy: { createdAt: 'desc' },
  },
  oldest: {
    label: 'Oldest First',
    value: 'oldest',
    orderBy: { createdAt: 'asc' },
  },
} as const

export const COMMENT_SORT_OPTIONS_LIST = Object.values(COMMENT_SORT_OPTIONS)

export const COMMENT_MAX_LENGTH = 1000
export const COMMENT_MIN_LENGTH = 1

export const COMMENT_PAGE_SIZE_OPTIONS = [5, 10, 20]
export const DEFAULT_COMMENT_PAGE_SIZE = COMMENT_PAGE_SIZE_OPTIONS[0]
