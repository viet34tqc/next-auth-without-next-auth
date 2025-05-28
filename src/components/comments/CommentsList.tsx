import Pagination from '@/components/ui/pagination'
import SortSelect from '@/components/ui/sort-select'
import { CommentItem } from './CommentItem'
import { COMMENT_PAGE_SIZE_OPTIONS, COMMENT_SORT_OPTIONS_LIST } from './constants'
import type { CommentWithUser } from './types'

type CommentsListProps = {
  comments: CommentWithUser[]
  currentUserId?: string
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

export function CommentsList({
  comments,
  currentUserId,
  currentPage,
  totalItems,
  itemsPerPage,
}: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Comments ({totalItems})</h3>
        <SortSelect
          options={COMMENT_SORT_OPTIONS_LIST}
          defaultValue='newest'
          paramName='commentSort'
          triggerClassName='w-40'
        />
      </div>

      <div className='space-y-4'>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isOwner={currentUserId === comment.userId}
            currentUserId={currentUserId}
          />
        ))}
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          pageSizeOptions={COMMENT_PAGE_SIZE_OPTIONS}
          pageParamName='commentPage'
          limitParamName='commentLimit'
          itemsLabel='Comments'
        />
      )}
    </div>
  )
}
