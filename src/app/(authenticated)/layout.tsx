import { getAuth } from '@/lib/auth/cookie'
import { PATHS } from '@/path'
import { redirect } from 'next/navigation'

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { session } = await getAuth()

  if (!session) {
    redirect(PATHS.signIn())
  }

  return <>{children}</>
}

export default AuthenticatedLayout
