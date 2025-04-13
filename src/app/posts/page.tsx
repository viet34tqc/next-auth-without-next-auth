import PageHeader from '@/components/layout/PageHeader'
import { Suspense } from 'react'
import PostList from './_components/PostList'
import Loading from './loading'

const PostsPage = async () => {
  return (
    <div className='space-y-6'>
      <PageHeader title='Posts' description='All of posts' />

      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  )
}

export default PostsPage
