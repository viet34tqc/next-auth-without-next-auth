import PageHeader from '@/components/layout/PageHeader'
import { PATHS } from '@/path'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='space-y-4'>
      <PageHeader title='Home' />
      <Link href={PATHS.posts()} className='underline'>
        Posts
      </Link>
    </div>
  )
}

export default HomePage
