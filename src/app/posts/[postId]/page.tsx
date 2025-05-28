import { CommentsSection } from '@/components/comments/CommentsSection'
import { DEFAULT_COMMENT_PAGE_SIZE } from '@/components/comments/constants'
import { CommentSortOption } from '@/components/comments/types'
import { BackButton } from '@/components/layout/BackButton'
import Placeholder from '@/components/layout/Placeholder'
import { DeletePostButton } from '@/components/posts/DeletePostButton'
import { EditPostButton } from '@/components/posts/EditPostDialog'
import { Separator } from '@/components/ui/separator'
import { getAuth } from '@/lib/auth/cookie'
import { DATE_FORMAT } from '@/lib/constants'
import { format } from 'date-fns'
import { Calendar, Clock, Star } from 'lucide-react'
import { Metadata } from 'next'
import { getPost } from '../_apis/getPost'

type PostDetailSearchParams = {
  commentSort?: CommentSortOption
  commentPage?: string
  commentLimit?: string
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}): Promise<Metadata> {
  // Fetch post data
  const { postId } = await params
  const post = await getPost(postId)

  return {
    title: `${post?.title} | Next Auth without Next Auth`,
    description: post?.content.substring(0, 160),
  }
}

const PostDetail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ postId: string }>
  searchParams: Promise<PostDetailSearchParams>
}) => {
  const { postId } = await params
  const { commentSort, commentPage, commentLimit } = await searchParams
  const page = commentPage ? parseInt(commentPage) : 1
  const limit = commentLimit ? parseInt(commentLimit) : DEFAULT_COMMENT_PAGE_SIZE
  const post = await getPost(postId)
  const { session } = await getAuth()

  const isOwner = session && post?.userId === session.userId

  if (post === null) {
    return <Placeholder text='Post not found' />
  }

  const formattedFeaturedDate = post.featuredAt
    ? format(new Date(post.featuredAt), DATE_FORMAT)
    : null

  return (
    <article className='space-y-6 max-w-5xl mx-auto'>
      <BackButton />
      <header>
        <div className='flex flex-wrap gap-2 justify-between items-center'>
          <div className='space-y-3 text-sm'>
            <h1>{post.title}</h1>
            <p className='text-muted-foreground'>by {post.user.username}</p>
            <span className='flex items-center gap-2 text-muted-foreground flex-wrap'>
              <time
                dateTime={post.createdAt.toLocaleDateString()}
                className='flex items-center gap-1'
              >
                <Calendar className='h-3 w-3' />
                Published: {format(post.createdAt, DATE_FORMAT)}
              </time>

              {post.updatedAt && post.updatedAt.getTime() !== post.createdAt.getTime() && (
                <>
                  <Separator orientation='vertical' className='!h-4' />
                  <time
                    dateTime={post.updatedAt.toLocaleDateString()}
                    className='flex items-center gap-1'
                  >
                    <Clock className='h-3 w-3' />
                    Updated: {post.updatedAt.toLocaleDateString()}
                  </time>
                </>
              )}
              {formattedFeaturedDate && (
                <>
                  <Separator orientation='vertical' className='!h-4' />
                  <span className='flex items-center gap-1'>
                    <Star className='h-3 w-3 text-amber-500' />
                    Featured: {formattedFeaturedDate}
                  </span>
                </>
              )}
            </span>
          </div>

          {isOwner && (
            <div className='flex gap-2'>
              <EditPostButton post={post} />
              <DeletePostButton id={postId} />
            </div>
          )}
        </div>
      </header>

      <p>{post.content}</p>

      <CommentsSection postId={postId} sort={commentSort} page={page} limit={limit} />
    </article>
  )
}

export default PostDetail
