import Placeholder from '@/components/layout/Placeholder'
import PostItem from '@/components/posts/PostItem'
import { SortOption } from '@/components/posts/types'
import { getUserPosts } from '../_apis/getUserPosts'

interface PostListProps {
  query?: string
  sort?: SortOption
}

const PostList = async ({ query, sort }: PostListProps) => {
  const posts = await getUserPosts(query, sort)

  if (!posts.length) {
    return (
      <Placeholder
        text={query ? `No posts found for "${query}"` : 'You have not created any posts yet'}
      />
    )
  }

  return (
    <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600'>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
