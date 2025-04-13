import PageHeader from '@/components/PageHeader'
import PostItem from './_components/PostItem'
import { PostType } from './_types'

const posts: PostType[] = [
  {
    id: '1',
    title: 'post 1',
    content: 'This is the content of post 1',
    status: 'published',
  },
  {
    id: '2',
    title: 'post 2',
    content: 'This is the content of post 2',
    status: 'draft',
  },
  {
    id: '3',
    title: 'post 3',
    content: 'This is the content of post 3',
    status: 'pending',
  },
]

const PostsPage = () => {
  return (
    <div className='space-y-6'>
      <PageHeader title='Posts' description='All of posts' />

      <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600 max-w-[30rem] mx-auto'>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
    </div>
  )
}

export default PostsPage
