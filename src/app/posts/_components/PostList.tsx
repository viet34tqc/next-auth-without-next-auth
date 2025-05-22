import Placeholder from '@/components/layout/Placeholder'
import PostItem from '@/components/posts/PostItem'
import { getPosts } from '../_apis/getPosts'

interface PostListProps {
  query: string
}

const PostList = async ({ query }: PostListProps) => {
  const posts = await getPosts(query)

  if (!posts.length) {
    return <Placeholder text={query ? `No posts found for "${query}"` : 'There are no posts'} />
  }

  return (
    <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600 '>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
