'use server'

import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const deletePost = async (id: string): Promise<ActionState> => {
  try {
    // Get the current user session
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to delete a post')
    }

    // Verify post ownership
    const post = await prisma.post.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.userId !== session.userId) {
      throw new Error('You can only delete your own posts')
    }

    // Delete post from database
    await prisma.post.delete({
      where: {
        id,
      },
    })

    revalidatePath('/')
    revalidatePath(PATHS.dashboard())

    const cookieStore = await cookies()
    cookieStore.set('toast-message', 'Post deleted successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }

  redirect('/')
}
