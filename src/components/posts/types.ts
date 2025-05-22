import { Prisma } from '@prisma/client'

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

export type SearchParams = {
  q: string
}
