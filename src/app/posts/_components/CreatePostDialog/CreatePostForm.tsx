'use client'

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
import { EMPTY_FORM_STATE } from '@/lib/utils'
import React, { useActionState } from 'react'
import { createPost } from '../../_actions/createPost'
import { SubmitButton } from '../SubmitButton'

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  // I use a ref as synchronous protection against multiple submissions
  const hasSubmittedRef = React.useRef(false)
  const [formState] = useActionState(createPost, EMPTY_FORM_STATE)

  const handleSubmit = async (formData: FormData) => {
    if (hasSubmittedRef.current) return

    hasSubmittedRef.current = true

    try {
      const result = await createPost(EMPTY_FORM_STATE, formData)

      if (result.status === 'SUCCESS') {
        // Close the dialog immediately on success
        onSuccess()
      } else {
        // reset if there was an error (allow the form to be submitted again)
        hasSubmittedRef.current = false
      }
    } catch (error) {
      hasSubmittedRef.current = false
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form action={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' name='title' placeholder='Post title' />
        {formState.fieldErrors.title && (
          <p className='text-destructive text-sm'>{formState.fieldErrors.title[0]}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='Post content'
          className='min-h-[100px] resize-none'
        />
        {formState.fieldErrors.content && (
          <p className='text-destructive text-sm'>{formState.fieldErrors.content[0]}</p>
        )}
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
        {formState.fieldErrors.status && (
          <p className='text-destructive text-sm'>{formState.fieldErrors.status[0]}</p>
        )}
      </div>

      {formState.status === 'ERROR' && formState.message && (
        <p className='text-destructive text-sm font-medium'>{formState.message}</p>
      )}

      <SubmitButton label='Create Post' loading='Creating...' />
    </form>
  )
}
