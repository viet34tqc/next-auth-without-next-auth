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
import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createPost } from '../../_actions/createPost'

type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}

const SubmitButton = ({
  label,
  loading,
  isSubmitting,
}: SubmitButtonProps & { isSubmitting: boolean }) => {
  const { pending } = useFormStatus()
  const isDisabled = pending || isSubmitting

  return (
    <Button disabled={isDisabled} type='submit' className='w-full'>
      {isDisabled ? loading : label}
    </Button>
  )
}

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  // We'll use a ref to track if the form has been submitted
  const hasSubmittedRef = React.useRef(false)
  const [formState] = useActionState(createPost, EMPTY_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting || hasSubmittedRef.current) return

    setIsSubmitting(true)
    hasSubmittedRef.current = true

    try {
      const result = await createPost(EMPTY_FORM_STATE, formData)

      if (result.status === 'SUCCESS') {
        // Close the dialog immediately on success
        onSuccess()
      } else {
        // Only reset if there was an error (allow form to be submitted again)
        setIsSubmitting(false)
        hasSubmittedRef.current = false
      }
    } catch (error) {
      // Handle any unexpected errors
      setIsSubmitting(false)
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

      <SubmitButton label='Create Post' loading='Creating...' isSubmitting={isSubmitting} />
    </form>
  )
}
