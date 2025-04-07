import { PATHS } from '@/path'
import Link from 'next/link'

const posts = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'This is the content of ticket 1',
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'This is the content of ticket 2',
  },
]

const PostsPage = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Tickets</h1>

      <ul className='space-y-3'>
        {posts.map((ticket) => (
          <li key={ticket.id} className='border border-slate-200 rounded-md p-4'>
            <h3 className='text-lg'>{ticket.title}</h3>
            <p className='text-sm text-slate-500 truncate'>{ticket.content}</p>
            <Link href={PATHS.ticket(ticket.id)}>{ticket.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage
