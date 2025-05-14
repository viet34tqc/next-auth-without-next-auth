import SignOutButton from '@/app/(auth)/sign-out/sign-out-button'
import { getAuth } from '@/lib/auth/cookie'
import { PATHS } from '@/path'
import { Newspaper } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitcher from '../theme/ThemeSwitcher'

const Header = async () => {
  const { user } = await getAuth()
  const appNav = (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <Link href='/dashboard'>Dashboard</Link>
      <SignOutButton />
    </>
  )
  const authNav = (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <ThemeSwitcher />
      <Link href={PATHS.signUp()}>Sign Up</Link>
      <Link href={PATHS.signIn()}>Sign In</Link>
    </>
  )

  return (
    <header>
      <nav className='py-4 border-b'>
        <div className='container flex justify-between items-center gap-4'>
          {user ? appNav : authNav}
        </div>
      </nav>
    </header>
  )
}

export default Header
