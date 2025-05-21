import { PATHS } from '@/path'
import type { User } from '@/lib/auth/types'
import { Newspaper } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitcher from '../../theme/ThemeSwitcher'
import { NavLink } from '../NavLink'
import { UserDropdown } from './UserDropdown'

interface NavigationProps {
  user: User | null
}

export function AuthenticatedNav({ user }: NavigationProps) {
  return (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <UserDropdown user={user} />
      </div>
    </>
  )
}

export function UnauthenticatedNav() {
  return (
    <>
      <Link href='/' className='flex items-center gap-2 mr-auto'>
        <Newspaper size='14' /> NewsPaper
      </Link>
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        <NavLink href={PATHS.signUp()}>Sign Up</NavLink>
        <NavLink href={PATHS.signIn()}>Sign In</NavLink>
      </div>
    </>
  )
}
