import PageHeader from '@/components/layout/PageHeader'
import { CreatePostButton } from '@/components/posts/CreatePostDialog'
import SearchAndSort from '@/components/posts/SearchAndSort'
import { SearchParams } from '@/components/posts/types'
import { Suspense } from 'react'
import PostList from './_components/PostList'
import Loading from './loading'

interface PostsPageProps {
  searchParams: SearchParams & { page?: string }
}

const PostsPage = async ({ searchParams }: PostsPageProps) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  return (
    <>
      <PageHeader title='Posts' description='Browse all posts' action={<CreatePostButton />} />

      <div className='max-w-[30rem] mx-auto'>
        <SearchAndSort />

        <Suspense fallback={<Loading />}>
          <PostList query={searchParams.q} sort={searchParams.sort} page={page} />
        </Suspense>
      </div>
    </>
  )
}

export default PostsPage
