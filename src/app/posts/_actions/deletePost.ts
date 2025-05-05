'use server'

import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const deletePost = async (id: string): Promise<ActionState> => {
  try {
    const cookieStore = await cookies()

    await prisma.post.delete({
      where: {
        id,
      },
    })

    revalidatePath(PATHS.posts())

    cookieStore.set('toast-message', 'Post deleted successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }

  redirect(PATHS.posts())
}
