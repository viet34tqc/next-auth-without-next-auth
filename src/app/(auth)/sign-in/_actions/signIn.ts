'use server';

import { setSessionCookie } from '@/lib/auth/cookie';
import { verifyHashPassword } from '@/lib/auth/password';
import { createSession, generateRandomSessionToken } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

export const signIn = async (formData: FormData) => {
  const formDataRaw = Object.fromEntries(formData.entries());

  try {
    // Validate user
    const user = await prisma.user.findUnique({
      where: {
        email: formDataRaw.email as string,
      },
    });
    if (!user) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    // Validate password
    const validPassword = await verifyHashPassword(
      user.passwordHash,
      formDataRaw.password as string
    );

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);

    redirect('/dashboard');
  } catch (error) {
    if (isRedirectError(error)) {
      redirect('/dashboard');
    }
    console.log('error', error);
  }
};
