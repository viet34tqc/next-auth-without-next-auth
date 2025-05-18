import { CreatePostButton } from '@/app/posts/_components/CreatePostDialog'
import PostList from '@/app/posts/_components/PostList'
import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import { getAuth } from '@/lib/auth/cookie'
import { Suspense } from 'react'

const HomePage = async () => {
  const { user } = await getAuth()

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Home'
        description='Welcome to our blog platform'
        action={user && <CreatePostButton />}
      />

      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  )
}

export default HomePage
