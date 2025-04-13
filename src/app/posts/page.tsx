import PageHeader from '@/components/layout/PageHeader'
import { Suspense } from 'react'
import PostList from './_components/PostList'

const PostsPage = async () => {
  return (
    <div className='space-y-6'>
      <PageHeader title='Posts' description='All of posts' />

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </div>
  )
}

export default PostsPage
