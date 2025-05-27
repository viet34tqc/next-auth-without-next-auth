'use client'

import useToastActionFeedback from '@/app/hooks/useToastActionFeedback'
import { createComment } from '@/app/posts/comments/_actions/createComment'
import { updateComment } from '@/app/posts/comments/_actions/updateComment'
import { FieldError } from '@/components/form/FieldError'
import { SubmitButton } from '@/components/posts/SubmitButton'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useActionState, useRef, useState } from 'react'
import { COMMENT_MAX_LENGTH } from './constants'
import type { CommentWithUser } from './types'

type CommentFormProps = {
  postId: string
  comment?: CommentWithUser
  onSuccess?: () => void
  onCancel?: () => void
}

export function CommentForm({ postId, comment, onSuccess, onCancel }: CommentFormProps) {
  const [content, setContent] = useState(comment?.content || '')
  const formRef = useRef<HTMLFormElement>(null)

  const isEditing = !!comment
  const action = isEditing ? updateComment.bind(null, comment.id) : createComment

  const [actionState, formAction] = useActionState(action, EMPTY_FORM_STATE)

  useToastActionFeedback(actionState, {
    onSuccessCallback: () => {
      if (!isEditing) {
        setContent('')
        formRef.current?.reset()
      }
      onSuccess?.()
    },
  })

  const remainingChars = COMMENT_MAX_LENGTH - content.length
  const isOverLimit = remainingChars < 0

  return (
    <form ref={formRef} action={formAction} className='space-y-4'>
      {!isEditing && <input type='hidden' name='postId' value={postId} />}

      <div className='space-y-2'>
        <Textarea
          name='content'
          placeholder={isEditing ? 'Edit your comment...' : 'Write a comment...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='min-h-[100px] resize-none'
          maxLength={COMMENT_MAX_LENGTH}
        />
        <div className='flex justify-between items-center text-sm'>
          <FieldError actionState={actionState} name='content' />
          <span className={`text-muted-foreground ${isOverLimit ? 'text-red-500' : ''}`}>
            {remainingChars} characters remaining
          </span>
        </div>
      </div>

      <div className={cn('grid gap-2', { 'grid-cols-2': isEditing })}>
        <SubmitButton
          label={isEditing ? 'Update Comment' : 'Post Comment'}
          loading={isEditing ? 'Updating...' : 'Posting...'}
        />
        {isEditing && onCancel && (
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
