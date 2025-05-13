import { Prisma } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import { ActionState } from './types'

export const fromErrorfromMessageToFormState = (error: unknown) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: 'ERROR' as const,
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    }
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let message = 'Database error'
    if (error.code === 'P2002') {
      message = 'Email existed'
    }
    return {
      status: 'ERROR' as const,
      message,
      fieldErrors: {},
      timestamp: Date.now(),
    }
  } else if (error instanceof Error) {
    return {
      status: 'ERROR' as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    }
  } else {
    return {
      status: 'ERROR' as const,
      message: 'An unknown error occurred',
      fieldErrors: {},
      timestamp: Date.now(),
    }
  }
}

export const fromMessageToFormState = (
  status: ActionState['status'],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
