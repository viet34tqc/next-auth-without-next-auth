import { getAuth } from '@/lib/auth/cookie'
import { redirect } from 'next/navigation'

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { session } = await getAuth()

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}

export default AuthenticatedLayout
