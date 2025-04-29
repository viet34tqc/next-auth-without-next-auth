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
import { useActionState, useTransition } from 'react'
import { createPost } from '../../_actions/createPost'
import { SubmitButton } from '../SubmitButton'

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  const [formState] = useActionState(createPost, EMPTY_FORM_STATE)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    if (isPending) return

    try {
      startTransition(async () => {
        const result = await createPost(EMPTY_FORM_STATE, formData)

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
        <Input id='title' name='title' placeholder='Post title' />
        <FieldError formState={formState} name='title' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='Post content'
          className='min-h-[100px] resize-none'
        />
        <FieldError formState={formState} name='content' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <input type='hidden' name='status' id='status-hidden' value='DRAFT' />
        <Select
          name='status'
          defaultValue='DRAFT'
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

      <SubmitButton label='Create Post' loading='Creating...' />
    </form>
  )
}
