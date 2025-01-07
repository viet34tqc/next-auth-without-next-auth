import { getAuth } from '@/lib/auth/cookie';
import { redirect } from 'next/navigation';

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getAuth();

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
