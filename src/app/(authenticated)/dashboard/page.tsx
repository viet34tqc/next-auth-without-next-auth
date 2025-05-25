import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import { CreatePostButton } from '@/components/posts/CreatePostDialog'
import SearchAndSort from '@/components/posts/SearchAndSort'
import { SearchParams } from '@/components/posts/types'
import { Suspense } from 'react'
import PostList from './_components/PostList'

interface DashboardPageProps {
  searchParams: Promise<SearchParams>
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1

  return (
    <>
      <PageHeader title='My Posts' description='Manage your posts' action={<CreatePostButton />} />

      <div className='max-w-[30rem] mx-auto'>
        <SearchAndSort />

        <Suspense fallback={<Loading />}>
          <PostList query={params.q} sort={params.sort} page={page} />
        </Suspense>
      </div>
    </>
  )
}

export default DashboardPage
