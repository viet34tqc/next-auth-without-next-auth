'use server'

import { setSessionCookie } from '@/lib/auth/cookie'
import { verifyHashPassword } from '@/lib/auth/password'
import { createSession, generateRandomSessionToken } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import { FormState, fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export const signIn = async (formState: FormState, formData: FormData) => {
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
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password')
    }

    // Validate password
    const validPassword = await verifyHashPassword(user.passwordHash, data.password as string)

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password')
    }

    const sessionToken = generateRandomSessionToken()
    const session = await createSession(sessionToken, user.id)

    await setSessionCookie(sessionToken, session.expiresAt)
    return fromMessageToFormState('SUCCESS', 'Signed in successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
