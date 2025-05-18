'use client'

import { Card } from '@/components/ui/card'
import { PATHS } from '@/path'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { POST_STATUS_ICONS } from '../_constants'
import { PostAndUsername } from '../_types'

type Props = {
  post: PostAndUsername
}

const PostItem = ({ post }: Props) => {
  const { id, title, content, status, featuredAt, user } = post
  const StatusIcon = POST_STATUS_ICONS[status]

  const formattedFeaturedDate = featuredAt ? format(new Date(featuredAt), 'MMM d, yyyy') : null

  return (
    <Card className='p-4' key={id}>
      <Link href={PATHS.post(id)} className='space-y-4 block' prefetch>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <StatusIcon className='size-4' aria-hidden={true} />
            <div>
              <h3>{title}</h3>
              <p className='text-xs text-muted-foreground'>by {user.username}</p>
            </div>
          </div>
          {formattedFeaturedDate && (
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <Star className='h-3 w-3 text-amber-500' />
              <span>Featured: {formattedFeaturedDate}</span>
            </div>
          )}
        </div>
        <p className='text-sm line-clamp-3'>{content}</p>

        <p className='underline'>View</p>
      </Link>
    </Card>
  )
}

export default PostItem
