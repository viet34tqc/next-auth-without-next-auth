'use server'

import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '@/components/comments/constants'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateCommentSchema = z.object({
  content: z
    .string()
    .min(COMMENT_MIN_LENGTH, {
      message: `Comment must be at least ${COMMENT_MIN_LENGTH} character`,
    })
    .max(COMMENT_MAX_LENGTH, {
      message: `Comment must be no more than ${COMMENT_MAX_LENGTH} characters`,
    }),
})

export async function updateComment(id: string, formState: ActionState, formData: FormData) {
  try {
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to edit comments')
    }

    const formDataRaw = Object.fromEntries(formData.entries())
    const data = updateCommentSchema.parse(formDataRaw)

    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { userId: true, postId: true },
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.userId !== session.userId) {
      throw new Error('You can only edit your own comments')
    }

    await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
    })

    revalidatePath(PATHS.post(comment.postId))
    revalidatePath(PATHS.home())

    return fromMessageToFormState('SUCCESS', 'Comment updated successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
