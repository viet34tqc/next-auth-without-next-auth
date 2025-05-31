'use server'

import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '@/components/comments/constants'
import { getAuth } from '@/lib/auth/cookie'
import { addSubmitId, hasSubmitId, clearSubmitIdList } from '@/lib/form/submitIdSet'
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
  parentId: z.string().optional(),
  submitId: z.string().min(1, { message: 'Submit ID is required' }),
})

export async function createComment(formState: ActionState, formData: FormData) {
  try {
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to comment')
    }

    const formDataRaw = Object.fromEntries(formData.entries())
    const data = commentSchema.parse(formDataRaw)

    // First, verify the post exists
    const post = await prisma.post.findUnique({
      where: { id: data.postId },
      select: { id: true }, // Optimize a bit by selecting only id
    })

    if (!post) {
      throw new Error('Post not found')
    }

    // If parentId is provided, verify the parent comment exists and belongs to the same post
    if (data.parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: data.parentId },
        select: { id: true, postId: true },
      })

      if (!parentComment) {
        throw new Error('Parent comment not found')
      }

      if (parentComment.postId !== data.postId) {
        throw new Error('Parent comment does not belong to this post')
      }
    }

    if (hasSubmitId(data.submitId)) {
      throw new Error('You are submitting too quickly. Please wait a moment.')
    }

    addSubmitId(data.submitId)

    await prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        userId: session.userId,
        parentId: data.parentId || null,
      },
    })

    revalidatePath(PATHS.post(data.postId))
    revalidatePath(PATHS.home())

    return fromMessageToFormState('SUCCESS', 'Comment added successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  } finally {
    setTimeout(() => {
      clearSubmitIdList()
    }, 1000)
  }
}
