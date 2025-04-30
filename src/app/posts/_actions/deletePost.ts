'use server'

import { prisma } from '@/lib/prisma'
import { FormState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deletePost = async (id: string): Promise<FormState> => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })
    revalidatePath(PATHS.posts())
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
  redirect(PATHS.posts())
}
