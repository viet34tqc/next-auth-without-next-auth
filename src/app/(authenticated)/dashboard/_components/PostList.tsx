import Placeholder from '@/components/layout/Placeholder'
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/components/posts/constants'
import PostItem from '@/components/posts/PostItem'
import { SortOption } from '@/components/posts/types'
import Pagination from '@/components/ui/pagination'
import { getUserPosts } from '../_apis/getUserPosts'

interface PostListProps {
  query?: string
  sort?: SortOption
  page: number
  size: number
}

const PostList = async ({ query, sort, page = 1, size = DEFAULT_PAGE_SIZE }: PostListProps) => {
  const { posts, total } = await getUserPosts(query, sort, page, size)

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

      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={size}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  )
}

export default PostList
