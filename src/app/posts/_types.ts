export type PostStatus = 'draft' | 'published' | 'pending'

export type PostType = {
  id: string
  title: string
  content: string
  status: PostStatus
}
