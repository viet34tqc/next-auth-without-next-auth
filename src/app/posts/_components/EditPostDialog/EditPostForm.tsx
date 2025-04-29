'use client'

import { FieldError } from '@/components/FieldError'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EMPTY_FORM_STATE } from '@/lib/types'
import { Post } from '@prisma/client'
import { useActionState, useTransition } from 'react'
import { updatePost } from '../../_actions/updatePost'
import { SubmitButton } from '../SubmitButton'

export function EditPostForm({ post, onSuccess }: { post: Post; onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [formState] = useActionState(
    (formState: typeof EMPTY_FORM_STATE, formData: FormData) =>
      updatePost(post.id, formState, formData),
    EMPTY_FORM_STATE,
  )

  // Custom action wrapper to prevent multiple submissions and handle success immediately
  const handleSubmit = async (formData: FormData) => {
    if (isPending) return

    try {
      startTransition(async () => {
        const result = await updatePost(post.id, EMPTY_FORM_STATE, formData)

        if (result.status === 'SUCCESS') {
          onSuccess()
        }
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form action={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' name='title' placeholder='Post title' defaultValue={post.title} />
        <FieldError formState={formState} name='title' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='Post content'
          className='min-h-[100px] resize-none'
          defaultValue={post.content}
        />
        <FieldError formState={formState} name='content' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <input type='hidden' name='status' id='status-hidden' value={post.status} />
        <Select
          name='status'
          defaultValue={post.status}
          onValueChange={(value) => {
            const hiddenInput = document.getElementById('status-hidden') as HTMLInputElement
            if (hiddenInput) hiddenInput.value = value
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='DRAFT'>Draft</SelectItem>
            <SelectItem value='PUBLISHED'>Published</SelectItem>
            <SelectItem value='PENDING'>Pending</SelectItem>
          </SelectContent>
        </Select>
        <FieldError formState={formState} name='status' />
      </div>

      {formState.status === 'ERROR' && formState.message && (
        <p className='text-destructive text-sm font-medium'>{formState.message}</p>
      )}

      <SubmitButton label='Update Post' loading='Updating...' />
    </form>
  )
}
