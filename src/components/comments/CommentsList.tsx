'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { CommentItem } from './CommentItem'
import { COMMENT_SORT_OPTIONS_LIST } from './constants'
import type { CommentWithUser, CommentSortOption } from './types'

type CommentsListProps = {
  comments: CommentWithUser[]
  currentUserId?: string
}

export function CommentsList({ comments, currentUserId }: CommentsListProps) {
  const [sortOption, setSortOption] = useState<CommentSortOption>('newest')

  if (comments.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  // Sort comments based on selected option
  const sortedComments = [...comments].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Comments ({comments.length})</h3>

        <Select
          value={sortOption}
          onValueChange={(value) => setSortOption(value as CommentSortOption)}
        >
          <SelectTrigger className='w-40'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COMMENT_SORT_OPTIONS_LIST.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-4'>
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isOwner={currentUserId === comment.userId}
          />
        ))}
      </div>
    </div>
  )
}
