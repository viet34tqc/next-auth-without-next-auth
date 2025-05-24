import Placeholder from '@/components/layout/Placeholder'
import { ITEMS_PER_PAGE } from '@/components/posts/constants'
import Pagination from '@/components/posts/Pagination'
import PostItem from '@/components/posts/PostItem'
import { SortOption } from '@/components/posts/types'
import { getUserPosts } from '../_apis/getUserPosts'

interface PostListProps {
  query?: string
  sort?: SortOption
  page?: number
}

const PostList = async ({ query, sort, page = 1 }: PostListProps) => {
  const { posts, total } = await getUserPosts(query, sort, page, ITEMS_PER_PAGE)

  if (!posts.length) {
    return (
      <Placeholder
        text={query ? `No posts found for "${query}"` : 'You have not created any posts yet'}
      />
    )
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600'>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>

      <Pagination currentPage={page} totalItems={total} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  )
}

export default PostList
