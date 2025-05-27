'use server'

import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteComment = async (id: string): Promise<ActionState> => {
  try {
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to delete comments')
    }

    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { userId: true, postId: true },
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.userId !== session.userId) {
      throw new Error('You can only delete your own comments')
    }

    await prisma.comment.delete({
      where: { id },
    })

    revalidatePath(PATHS.post(comment.postId))
    revalidatePath(PATHS.home())

    const cookieStore = await cookies()
    cookieStore.set('toast-message', 'Comment deleted successfully')

    return {
      status: 'SUCCESS',
      message: 'Comment deleted successfully',
      fieldErrors: {},
      timestamp: Date.now(),
    }
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
