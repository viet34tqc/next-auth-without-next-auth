import PostList from '@/app/posts/_components/PostList'
import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import SearchAndSort from '@/components/posts/SearchAndSort'
import { SearchParams } from '@/components/posts/types'
import { Suspense } from 'react'

interface HomePageProps {
  searchParams: Promise<SearchParams>
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1

  return (
    <>
      <PageHeader title='Home' description='Welcome to our blog platform' />
      <div className='max-w-[30rem] mx-auto '>
        <SearchAndSort />

        <Suspense fallback={<Loading />}>
          <PostList query={params.q} sort={params.sort} page={page} />
        </Suspense>
      </div>
    </>
  )
}

export default HomePage
