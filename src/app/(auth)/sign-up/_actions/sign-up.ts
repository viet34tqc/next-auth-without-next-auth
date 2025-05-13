'use server'

import { setSessionCookie } from '@/lib/auth/cookie'
import { hashPassword } from '@/lib/auth/password'
import { createSession, generateRandomSessionToken } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpSchema = z
  .object({
    username: z.string(),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>

export const signUp = async (formState: ActionState, formData: FormData) => {
  try {
    const formDataRaw = Object.fromEntries(formData.entries())
    const data = signUpSchema.parse(formDataRaw)

    const passwordHash = await hashPassword(data.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
      },
    })

    // Create session
    const sessionToken = generateRandomSessionToken()
    const session = await createSession(sessionToken, user.id)

    // After create user and session, set cookie
    await setSessionCookie(sessionToken, session.expiresAt)
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
  redirect('/dashboard')
}

export default signUp
