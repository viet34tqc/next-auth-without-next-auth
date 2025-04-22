'use server'

import { prisma } from '@/lib/prisma'
import { FormState, fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'

export const deletePost = async (id: string): Promise<FormState> => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })
    revalidatePath(PATHS.posts())

    // Return success status to the client
    return fromMessageToFormState('SUCCESS', 'Post deleted successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
