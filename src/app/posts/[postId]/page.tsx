import Placeholder from '@/components/layout/Placeholder'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { Calendar, Clock, Star } from 'lucide-react'
import { Metadata } from 'next'
import { getPost } from '../_apis/getPost'
import { DeletePostButton } from '../_components/DeletePostButton'
import { EditPostButton } from '../_components/EditPostDialog'

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

const PostDetail = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params
  const post = await getPost(postId)

  if (post === null) {
    return <Placeholder text='Post not found' />
  }

  const formattedFeaturedDate = post.featuredAt
    ? format(new Date(post.featuredAt), 'MMMM d, yyyy')
    : null

  return (
    <article className='space-y-4 max-w-5xl mx-auto'>
      <header>
        <div className='flex flex-wrap gap-2 justify-between items-center'>
          <div className='space-y-2'>
            <h1>{post.title}</h1>
            <span className='flex items-center gap-2 text-muted-foreground flex-wrap'>
              <time
                dateTime={post.createdAt.toLocaleDateString()}
                className='flex items-center gap-1'
              >
                <Calendar className='h-3 w-3' />
                Published: {post.createdAt.toLocaleDateString()}
              </time>
              <Separator orientation='vertical' className='!h-4' />
              {post.updatedAt && post.updatedAt.getTime() !== post.createdAt.getTime() && (
                <time
                  dateTime={post.updatedAt.toLocaleDateString()}
                  className='flex items-center gap-1'
                >
                  <Clock className='h-3 w-3' />
                  Updated: {post.updatedAt.toLocaleDateString()}
                </time>
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

          <div className='flex gap-2'>
            <EditPostButton post={post} />
            <DeletePostButton id={postId} />
          </div>
        </div>
      </header>

      <p>{post.content}</p>
    </article>
  )
}

export default PostDetail
