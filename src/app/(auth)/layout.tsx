import { getAuth } from '@/lib/auth/cookie'
import { redirect } from 'next/navigation'

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = await getAuth()

  if (user) {
    redirect('/dashboard')
  }

  return <>{children}</>
}

export default AuthLayout
