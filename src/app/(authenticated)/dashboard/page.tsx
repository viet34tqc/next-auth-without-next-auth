import { CreatePostButton } from '@/app/posts/_components/CreatePostDialog'
import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/posts/SearchInput'
import { SearchParams } from '@/components/posts/types'
import { Suspense } from 'react'
import PostList from './_components/PostList'

interface DashboardPageProps {
  searchParams: SearchParams
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const { q } = await searchParams

  return (
    <>
      <PageHeader title='My Posts' description='Manage your posts' action={<CreatePostButton />} />

      <div className='max-w-[30rem] mx-auto'>
        <SearchInput />

        <Suspense fallback={<Loading />}>
          <PostList query={q} />
        </Suspense>
      </div>
    </>
  )
}

export default DashboardPage
