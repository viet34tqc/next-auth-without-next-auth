import { CreatePostButton } from '@/app/posts/_components/CreatePostDialog'
import PostList from '@/app/posts/_components/PostList'
import Loading from '@/app/posts/loading'
import PageHeader from '@/components/layout/PageHeader'
import SearchInput from '@/components/posts/SearchInput'
import { SearchParams } from '@/components/posts/types'
import { getAuth } from '@/lib/auth/cookie'
import { Suspense } from 'react'

interface HomePageProps {
  searchParams: SearchParams
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { q } = await searchParams
  const { user } = await getAuth()

  return (
    <>
      <PageHeader
        title='Home'
        description='Welcome to our blog platform'
        action={user && <CreatePostButton />}
      />
      <div className='max-w-[30rem] mx-auto '>
        <SearchInput />

        <Suspense fallback={<Loading />}>
          <PostList query={q} />
        </Suspense>
      </div>
    </>
  )
}

export default HomePage
