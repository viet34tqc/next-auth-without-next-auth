export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'PENDING'

export type PostType = {
  id: string
  title: string
  content: string
  status: PostStatus
}
