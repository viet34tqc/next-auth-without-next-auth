import { Prisma } from '@prisma/client'

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: { user: { select: { username: true } } }
}>

export type CommentFormData = {
  content: string
  postId: string
}

export type CommentSortOption = 'newest' | 'oldest'

export type CommentSortConfig = {
  label: string
  value: CommentSortOption
  orderBy: Prisma.CommentOrderByWithRelationInput
}
