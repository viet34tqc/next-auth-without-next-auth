'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DATE_FORMAT } from '@/lib/constants'
import { format } from 'date-fns'
import { Calendar, Clock, Edit, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { CommentForm } from './CommentForm'
import { DeleteCommentButton } from './DeleteCommentButton'
import type { CommentWithUser } from './types'

type CommentItemProps = {
  comment: CommentWithUser
  isOwner: boolean
  currentUserId?: string
  depth?: number
}

export function CommentItem({ comment, isOwner, currentUserId, depth }: CommentItemProps) {
  const actualDepth = depth ?? comment.depth ?? 0
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const handleEditSuccess = () => {
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
  }

  const handleReplySuccess = () => {
    setIsReplying(false)
  }

  const handleReplyCancel = () => {
    setIsReplying(false)
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
    <div className={`border rounded-lg p-4 space-y-3 ${actualDepth > 0 ? 'bg-muted/20' : ''}`}>
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

        <div className='flex gap-1'>
          {currentUserId && actualDepth < 5 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsReplying(true)}
              className='text-green-600 hover:text-green-700 hover:bg-green-50'
            >
              <MessageCircle className='h-3 w-3' />
              Reply
            </Button>
          )}
          {isOwner && (
            <>
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
            </>
          )}
        </div>
      </div>

      <p className='text-sm leading-relaxed whitespace-pre-wrap'>{comment.content}</p>

      {/* Reply form */}
      {isReplying && (
        <div className='mt-4 p-3 bg-muted/30 rounded-lg border-l-2 border-green-200'>
          <CommentForm
            postId={comment.postId}
            parentId={comment.id}
            onSuccess={handleReplySuccess}
            onCancel={handleReplyCancel}
          />
        </div>
      )}

      {/* Here are the nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='mt-4 space-y-3'>
          {comment.replies.map((reply) => (
            <div key={reply.id} className='ml-6  pl-4 relative'>
              <CommentItem
                comment={reply}
                isOwner={currentUserId === reply.userId}
                currentUserId={currentUserId}
                depth={actualDepth + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
