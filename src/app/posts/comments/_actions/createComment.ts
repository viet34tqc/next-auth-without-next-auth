'use server'

import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '@/components/comments/constants'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const commentSchema = z.object({
  content: z
    .string()
    .min(COMMENT_MIN_LENGTH, {
      message: `Comment must be at least ${COMMENT_MIN_LENGTH} character`,
    })
    .max(COMMENT_MAX_LENGTH, {
      message: `Comment must be no more than ${COMMENT_MAX_LENGTH} characters`,
    }),
  postId: z.string().min(1, { message: 'Post ID is required' }),
})

export async function createComment(formState: ActionState, formData: FormData) {
  try {
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to comment')
    }

    const formDataRaw = Object.fromEntries(formData.entries())
    const data = commentSchema.parse(formDataRaw)

    // Verify the post exists
    const post = await prisma.post.findUnique({
      where: { id: data.postId },
      select: { id: true }, // Optimize a bit by selecting only id
    })

    if (!post) {
      throw new Error('Post not found')
    }

    await prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        userId: session.userId,
      },
    })

    revalidatePath(PATHS.post(data.postId))
    revalidatePath(PATHS.home())

    return fromMessageToFormState('SUCCESS', 'Comment added successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
