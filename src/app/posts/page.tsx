import { PATHS } from '@/path'
import Link from 'next/link'

const posts = [
  {
    id: '1',
    title: 'post 1',
    content: 'This is the content of post 1',
  },
  {
    id: '2',
    title: 'post 2',
    content: 'This is the content of post 2',
  },
]

const PostsPage = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Posts</h1>

      <ul className='space-y-3 animate-fade-down'>
        {posts.map((post) => (
          <li key={post.id} className='border border-slate-200 rounded-md p-4'>
            <h3 className='text-lg'>{post.title}</h3>
            <p className='text-sm text-slate-500 truncate'>{post.content}</p>
            <Link href={PATHS.post(post.id)}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage
