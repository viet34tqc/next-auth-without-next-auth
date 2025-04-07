import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    <div className='space-y-6'>
      <header>
        <h1 className='tracking-tight'>Posts</h1>
        <p className='text-muted-foreground'>All of posts</p>
      </header>
      <Separator />

      <div className='space-y-3 animate-in fade-in-10 slide-in-from-top-10 duration-600 max-w-[30rem] mx-auto'>
        {posts.map((post) => (
          <Card className='p-4' key={post.id}>
            <Link href={PATHS.post(post.id)} className='space-y-4 block'>
              <h3>{post.title}</h3>
              <p className='text-sm text-slate-500 truncate'>{post.content}</p>

              <p className='underline'>View</p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PostsPage
