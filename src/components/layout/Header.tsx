import SignOutButton from '@/app/(auth)/sign-out/sign-out-button'
import { getAuth } from '@/lib/auth/cookie'
import { PATHS } from '@/path'
import { Newspaper } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import { NavLink } from './NavLink'

const Header = async () => {
  const { user } = await getAuth()
  const appNav = (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <ThemeSwitcher />
      <NavLink href={PATHS.dashboard()}>Dashboard</NavLink>
      <SignOutButton />
    </>
  )
  const authNav = (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <ThemeSwitcher />
      <NavLink href={PATHS.signUp()}>Sign Up</NavLink>
      <NavLink href={PATHS.signIn()}>Sign In</NavLink>
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
