'use server'

import { prisma } from '@/lib/prisma'
import { FormState } from '@/lib/types'
import { fromErrorfromMessageToFormState, fromMessageToFormState } from '@/lib/utils'
import { PATHS } from '@/path'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { PostStatus } from '../_types'

// Zod schema for post validation
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
})

export type PostFormValues = z.infer<typeof postSchema>

export async function createPost(formState: FormState, formData: FormData) {
  try {
    const formDataRaw = Object.fromEntries(formData.entries())
    const data = postSchema.parse(formDataRaw)

    // Create post in database
    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.status as PostStatus,
      },
    })

    revalidatePath(PATHS.posts())

    return fromMessageToFormState('SUCCESS', 'Post created successfully')
  } catch (error) {
    return fromErrorfromMessageToFormState(error)
  }
}
