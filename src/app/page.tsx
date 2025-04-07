import { PATHS } from '@/path'
import Link from 'next/link'

// src/app/page.tsx
const HomePage = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Homepage</h1>
      <Link href={PATHS.posts()} className='underline'>
        Tickets
      </Link>
    </div>
  )
}

export default HomePage
