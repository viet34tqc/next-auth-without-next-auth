import PageHeader from '@/components/layout/PageHeader'
import { DEFAULT_PAGE_SIZE } from '@/components/posts/constants'
import { CreatePostButton } from '@/components/posts/CreatePostDialog'
import SearchAndSort from '@/components/posts/SearchAndSort'
import { SearchParams } from '@/components/posts/types'
import { Suspense } from 'react'
import PostList from './_components/PostList'
import Loading from './loading'

interface PostsPageProps {
  searchParams: Promise<SearchParams>
}

const PostsPage = async ({ searchParams }: PostsPageProps) => {
  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1
  const size = params.limit ? parseInt(params.limit) : DEFAULT_PAGE_SIZE

  return (
    <>
      <PageHeader title='Posts' description='Browse all posts' action={<CreatePostButton />} />

      <div className='max-w-[30rem] mx-auto'>
        <SearchAndSort />

        <Suspense fallback={<Loading />}>
          <PostList query={params.q} sort={params.sort} page={page} size={size} />
        </Suspense>
      </div>
    </>
  )
}

export default PostsPage
