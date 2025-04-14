import { Check, Hourglass, Pencil } from 'lucide-react'

export const MOCK_POSTS = [
  {
    id: '1',
    title: 'post 1',
    content: 'This is the content of post 1',
    status: 'PUBLISHED' as const,
  },
  {
    id: '2',
    title: 'post 2',
    content: 'This is the content of post 2',
    status: 'DRAFT' as const,
  },
  {
    id: '3',
    title: 'post 3',
    content: 'This is the content of post 3',
    status: 'PENDING' as const,
  },
]

export const POST_STATUS_ICONS = {
  DRAFT: Pencil,
  PUBLISHED: Check,
  PENDING: Hourglass,
}
