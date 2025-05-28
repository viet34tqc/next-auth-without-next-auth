import { Prisma } from '@prisma/client'

// Base comment type from database
export type BaseComment = Prisma.CommentGetPayload<{
  include: {
    user: { select: { username: true } }
  }
}>

// Recursive comment type with unlimited nesting
export type CommentWithUser = BaseComment & {
  replies?: CommentWithUser[]
  depth?: number
}

export type CommentFormData = {
  content: string
  postId: string
  parentId?: string
}

export type CommentSortOption = 'newest' | 'oldest'

export type CommentSortConfig = {
  label: string
  value: CommentSortOption
  orderBy: Prisma.CommentOrderByWithRelationInput
}

export type CommentSearchParams = {
  commentSort?: CommentSortOption
  commentPage?: string
  commentLimit?: string
}
