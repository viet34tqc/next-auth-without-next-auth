import { CommentItem } from './CommentItem'
import { CommentSortSelect } from './CommentSortSelect'
import type { CommentWithUser } from './types'

type CommentsListProps = {
  comments: CommentWithUser[]
  currentUserId?: string
}

export function CommentsList({ comments, currentUserId }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Comments ({comments.length})</h3>
        <CommentSortSelect />
      </div>

      <div className='space-y-4'>
        {comments.map((comment) => (
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
