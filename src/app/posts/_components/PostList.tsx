import { getPosts } from '../_apis/getPosts'
import PostItem from './PostItem'

const PostList = async () => {
  const posts = await getPosts()
  return (
    <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600 max-w-[30rem] mx-auto'>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
