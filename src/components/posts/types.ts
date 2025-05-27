import { Prisma } from '@prisma/client'
import { SORT_OPTIONS } from './constants'

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'PENDING'

export type PostType = {
  id: string
  title: string
  content: string
  status: PostStatus
}

export type PostAndUsername = Prisma.PostGetPayload<{
  include: { user: { select: { username: true } } }
}>

export type PostWithCommentCount = PostAndUsername & {
  _count?: {
    Comment: number
  }
}

export type SearchParams = {
  q?: string
  sort?: SortOption
  page?: string
  limit?: string
}

export type SortOption = keyof typeof SORT_OPTIONS

export type SortOptionConfig = {
  label: string
  value: SortOption
  orderBy: Prisma.PostOrderByWithRelationInput
}
