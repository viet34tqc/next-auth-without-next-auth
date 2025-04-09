import PageHeader from '@/components/PageHeader'
import { PATHS } from '@/path'
import Link from 'next/link'

// src/app/page.tsx
const HomePage = () => {
  return (
    <div className='space-y-4'>
      <PageHeader title='Home' />
      <Link href={PATHS.posts()} className='underline'>
        Tickets
      </Link>
    </div>
  )
}

export default HomePage
