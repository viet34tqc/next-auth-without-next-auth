import { getAuth } from '@/lib/auth/cookie'
import { AuthenticatedNav, UnauthenticatedNav } from './Navigation'

export default async function Header() {
  const { user } = await getAuth()
  return (
    <header>
      <nav className='py-4 border-b'>
        <div className='container flex justify-between items-center gap-4'>
          {user ? <AuthenticatedNav user={user} /> : <UnauthenticatedNav />}
        </div>
      </nav>
    </header>
  )
}
