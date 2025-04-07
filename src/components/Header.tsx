import SignOutButton from '@/app/(auth)/sign-out/sign-out-button'
import { getAuth } from '@/lib/auth/cookie'
import { Newspaper } from 'lucide-react'
import Link from 'next/link'

const Header = async () => {
  const { user } = await getAuth()
  const appNav = (
    <>
      <Link href='/' className='flex items-center gap-2'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <Link href='/dashboard'>Dashboard</Link>
      <SignOutButton />
    </>
  )
  const authNav = (
    <>
      <Link href='/sign-up'>Sign Up</Link>
      <Link href='/login'>Sign In</Link>
    </>
  )

  return (
    <header>
      <nav className='py-5 border-b'>
        <div className='container flex justify-between '>{user ? appNav : authNav}</div>
      </nav>
    </header>
  )
}

export default Header
