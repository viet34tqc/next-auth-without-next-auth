import { getComments } from '@/app/posts/comments/_apis/getComments'
import { getAuth } from '@/lib/auth/cookie'
import { PATHS } from '@/path'
import Link from 'next/link'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'
import { DEFAULT_COMMENT_PAGE_SIZE } from './constants'
import type { CommentSortOption } from './types'

type CommentsSectionProps = {
  postId: string
  sort?: CommentSortOption
  page?: number
  limit?: number
}

export async function CommentsSection({
  postId,
  sort = 'newest',
  page = 1,
  limit = DEFAULT_COMMENT_PAGE_SIZE,
}: CommentsSectionProps) {
  const { session } = await getAuth()
  const { comments, total } = await getComments({ postId, sort, page, limit })

  return (
    <section className='space-y-6'>
      <div className='border-t pt-6'>
        <h2 className='text-xl font-semibold mb-4'>Comments</h2>

        {session ? (
          <div className='mb-6'>
            <CommentForm postId={postId} />
          </div>
        ) : (
          <div className='mb-6 p-4 border rounded-lg bg-muted/50 text-center'>
            <p className='text-muted-foreground mb-2'>Sign in to join the conversation</p>
            <Link href={PATHS.signIn()} className='text-primary hover:underline font-medium'>
              Sign In
            </Link>
          </div>
        )}

        <CommentsList
          comments={comments}
          currentUserId={session?.userId}
          currentPage={page}
          totalItems={total}
          itemsPerPage={limit}
        />
      </div>
    </section>
  )
}
