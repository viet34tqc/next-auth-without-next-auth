'use server';

import { setSessionCookie } from '@/lib/auth/cookie';
import { hashPassword } from '@/lib/auth/password';
import { createSession, generateRandomSessionToken } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const signUp = async (formData: FormData) => {
  const formDataRaw = Object.fromEntries(formData.entries());

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const passwordHash = await hashPassword(formDataRaw.password as string);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: formDataRaw.firstName as string,
        lastName: formDataRaw.lastName as string,
        email: formDataRaw.email as string,
        passwordHash,
      },
    });

    // Create session
    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    // After create user and session, set cookie
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    console.log('error', error);
    redirect('/dashboard');
  }
};

export default signUp;
