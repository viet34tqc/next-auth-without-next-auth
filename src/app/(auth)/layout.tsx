import { getAuth } from '@/lib/auth/cookie'
import { redirect } from 'next/navigation'

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { session } = await getAuth()

  if (session) {
    redirect('/dashboard')
  }

  return <>{children}</>
}

export default AuthLayout
