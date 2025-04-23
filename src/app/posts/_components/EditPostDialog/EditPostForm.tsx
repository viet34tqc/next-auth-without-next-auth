'use client'

import { Button } from '@/components/ui/button'
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
import { Post } from '@prisma/client'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { updatePost } from '../../_actions/updatePost'

type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type='submit' className='w-full'>
      {pending ? loading : label}
    </Button>
  )
}

export function EditPostForm({ post, onSuccess }: { post: Post; onSuccess: () => void }) {
  const hasSubmittedRef = React.useRef(false)
  const [formState] = useActionState(
    (formState: typeof EMPTY_FORM_STATE, formData: FormData) =>
      updatePost(post.id, formState, formData),
    EMPTY_FORM_STATE,
  )

  // Custom action wrapper to prevent multiple submissions and handle success immediately
  const handleSubmit = async (formData: FormData) => {
    // Prevent submission if already submitted
    if (hasSubmittedRef.current) return

    hasSubmittedRef.current = true

    try {
      const result = await updatePost(post.id, EMPTY_FORM_STATE, formData)

      if (result.status === 'SUCCESS') {
        // Close the dialog immediately on success
        onSuccess()
      } else {
        hasSubmittedRef.current = false
      }
    } catch (error) {
      // Handle any unexpected errors
      hasSubmittedRef.current = false
      console.error('Error updating post:', error)
    }
  }

  return (
    <form action={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' name='title' placeholder='Post title' defaultValue={post.title} />
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
          defaultValue={post.content}
        />
        {formState.fieldErrors.content && (
          <p className='text-destructive text-sm'>{formState.fieldErrors.content[0]}</p>
        )}
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
        {formState.fieldErrors.status && (
          <p className='text-destructive text-sm'>{formState.fieldErrors.status[0]}</p>
        )}
      </div>

      {formState.status === 'ERROR' && formState.message && (
        <p className='text-destructive text-sm font-medium'>{formState.message}</p>
      )}

      <SubmitButton label='Update Post' loading='Updating...' />
    </form>
  )
}
