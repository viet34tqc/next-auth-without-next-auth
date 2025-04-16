'use client'

import { Card } from '@/components/ui/card'
import { PATHS } from '@/path'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { POST_STATUS_ICONS } from '../_constants'

const PostItem = ({ post }: { post: Post }) => {
  const { id, title, content, status } = post
  const StatusIcon = POST_STATUS_ICONS[status]

  return (
    <Card className='p-4' key={id}>
      <Link href={PATHS.post(id)} className='space-y-4 block' prefetch>
        <div className='flex items-center gap-2'>
          <StatusIcon className='size-4' aria-hidden={true} />
          <h3>{title}</h3>
        </div>
        <p className='text-sm line-clamp-3'>{content}</p>

        <p className='underline'>View</p>
      </Link>
    </Card>
  )
}

export default PostItem
