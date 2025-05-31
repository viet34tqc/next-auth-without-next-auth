'use server'

const submitIdList = new Set<string>()

import { PostStatus } from '@/components/posts/types'
import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ActionState } from '@/lib/types'
import { fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  content: z.string().min(1, { message: 'Content is required' }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'PENDING'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be DRAFT, PUBLISHED, or PENDING',
  }),
  featuredAt: z.string().optional().nullable(),
  submitId: z.string().min(1, { message: 'Submit ID is required' }),
})

export type PostFormValues = z.infer<typeof postSchema>

export async function createPost(formState: ActionState, formData: FormData) {
  try {
    const { session } = await getAuth()

    if (!session) {
      throw new Error('You must be logged in to create a post')
    }

    const formDataRaw = Object.fromEntries(formData.entries())
    const data = postSchema.parse(formDataRaw)

    if (submitIdList.has(data.submitId)) {
      throw new Error('You are submitting too quickly. Please wait a moment.')
    }

    submitIdList.add(data.submitId)

    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.status as PostStatus,
        featuredAt:
          data.featuredAt && data.featuredAt.trim() !== '' ? new Date(data.featuredAt) : null,
        userId: session.userId,
      },
    })

    revalidatePath(PATHS.home())
    revalidatePath(PATHS.dashboard())

    return fromMessageToFormState('SUCCESS', 'Post created successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  } finally {
    setTimeout(() => {
      submitIdList.clear()
    }, 1000)
  }
}
