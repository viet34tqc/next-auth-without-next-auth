'use server';

import { deleteSessionCookie, getAuth } from '@/lib/auth/cookie';
import { invalidateSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export const signOut = async () => {
  const { session } = await getAuth();
  if (!session) {
    redirect('/login');
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect('/login');
};
