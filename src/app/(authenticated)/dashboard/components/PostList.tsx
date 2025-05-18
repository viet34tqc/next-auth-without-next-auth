import Placeholder from '@/components/layout/Placeholder'
import { getUserPosts } from '../_apis/getUserPosts'
import PostItem from '@/app/posts/_components/PostItem'

const PostList = async () => {
  const posts = await getUserPosts()

  if (!posts.length) {
    return <Placeholder text='You have not created any posts yet' />
  }

  return (
    <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600 max-w-[30rem] mx-auto'>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
