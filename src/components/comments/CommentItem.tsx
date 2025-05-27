'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DATE_FORMAT } from '@/lib/constants'
import { format } from 'date-fns'
import { Calendar, Clock, Edit } from 'lucide-react'
import { useState } from 'react'
import { CommentForm } from './CommentForm'
import { DeleteCommentButton } from './DeleteCommentButton'
import type { CommentWithUser } from './types'

type CommentItemProps = {
  comment: CommentWithUser
  isOwner: boolean
}

export function CommentItem({ comment, isOwner }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditSuccess = () => {
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
  }

  const wasEdited = comment.updatedAt.getTime() !== comment.createdAt.getTime()

  if (isEditing) {
    return (
      <div className='border rounded-lg p-4 bg-muted/50'>
        <CommentForm
          postId={comment.postId}
          comment={comment}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      </div>
    )
  }

  return (
    <div className='border rounded-lg p-4 space-y-3'>
      <div className='flex justify-between items-start'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <span className='font-medium text-foreground'>
              {comment.user?.username || 'Anonymous'}
            </span>
            <Separator orientation='vertical' className='!h-4' />
            <time dateTime={comment.createdAt.toISOString()} className='flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              {format(comment.createdAt, DATE_FORMAT)}
            </time>
            {wasEdited && (
              <>
                <Separator orientation='vertical' className='!h-4' />
                <span className='flex items-center gap-1'>
                  <Clock className='h-3 w-3' />
                  Edited {format(comment.updatedAt, DATE_FORMAT)}
                </span>
              </>
            )}
          </div>
        </div>

        {isOwner && (
          <div className='flex gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsEditing(true)}
              className='text-blue-600 hover:text-blue-700 hover:bg-blue-50'
            >
              <Edit className='h-3 w-3' />
              Edit
            </Button>
            <DeleteCommentButton id={comment.id} />
          </div>
        )}
      </div>

      <p className='text-sm leading-relaxed whitespace-pre-wrap'>{comment.content}</p>
    </div>
  )
}
