'use server'

import { setSessionCookie } from '@/lib/auth/cookie'
import { verifyHashPassword } from '@/lib/auth/password'
import { createSession, generateRandomSessionToken } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const signIn = async (formState: ActionState, formData: FormData) => {
  try {
    const formDataRaw = Object.fromEntries(formData.entries())
    const data = signInSchema.parse(formDataRaw)

    // Validate user
    const user = await prisma.user.findUnique({
      where: {
        email: data.email as string,
      },
    })
    if (!user) {
      throw new Error('Incorrect email or password')
    }

    if (user && !user.passwordHash) {
      throw new Error('This user has sign in with another method')
    }

    const validPassword = await verifyHashPassword(user.passwordHash, data.password as string)

    if (!validPassword) {
      throw new Error('Incorrect email or password')
    }

    const sessionToken = generateRandomSessionToken()
    const session = await createSession(sessionToken, user.id)

    await setSessionCookie(sessionToken, session.expiresAt)
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
  redirect('/dashboard')
}
