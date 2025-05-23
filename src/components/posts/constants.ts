import { Check, Clock, Hourglass } from 'lucide-react'

export const POST_STATUS_ICONS = {
  DRAFT: Clock,
  PUBLISHED: Check,
  PENDING: Hourglass,
}

/**
 * Configuration for sort options
 */
export const SORT_OPTIONS = {
  newest: {
    label: 'Newest First',
    value: 'newest' as const,
    orderBy: { createdAt: 'desc' as const },
  },
  oldest: {
    label: 'Oldest First',
    value: 'oldest' as const,
    orderBy: { createdAt: 'asc' as const },
  },
  'a-z': {
    label: 'Title: A-Z',
    value: 'a-z' as const,
    orderBy: { title: 'asc' as const },
  },
  'z-a': {
    label: 'Title: Z-A',
    value: 'z-a' as const,
    orderBy: { title: 'desc' as const },
  },
  'recently-updated': {
    label: 'Recently Updated',
    value: 'recently-updated' as const,
    orderBy: { updatedAt: 'desc' as const },
  },
} as const

/**
 * Array of sort options for use in UI components
 */
export const SORT_OPTIONS_LIST = Object.values(SORT_OPTIONS)
