import { CreatePostButton } from '@/app/posts/_components/CreatePostDialog'
import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import { Suspense } from 'react'
import PostList from './components/PostList'

const DashboardPage = async () => {
  return (
    <div className='space-y-6'>
      <PageHeader title='My Posts' description='Manage your posts' action={<CreatePostButton />} />

      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  )
}

export default DashboardPage
