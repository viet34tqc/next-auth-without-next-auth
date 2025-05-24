'use client'

import useToastActionFeedback from '@/app/hooks/useToastActionFeedback'
import { FieldError } from '@/components/form/FieldError'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectWithHiddenInput } from '@/components/ui/select-with-hidden-input'
import { Textarea } from '@/components/ui/textarea'
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { useActionState } from 'react'
import { createPost } from '@/app/posts/_actions/createPost'
import { SubmitButton } from './SubmitButton'

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  const [actionState, action] = useActionState(createPost, EMPTY_FORM_STATE)

  useToastActionFeedback(actionState, {
    onSuccessCallback: () => onSuccess(),
  })

  return (
    <form action={action} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' name='title' placeholder='Post title' />
        <FieldError actionState={actionState} name='title' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          id='content'
          name='content'
          placeholder='Post content'
          className='min-h-[100px] resize-none'
        />
        <FieldError actionState={actionState} name='content' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <SelectWithHiddenInput
          name='status'
          defaultValue='DRAFT'
          placeholder='Select a status'
          options={[
            { value: 'DRAFT', label: 'Draft' },
            { value: 'PUBLISHED', label: 'Published' },
            { value: 'PENDING', label: 'Pending' },
          ]}
        />
        <FieldError actionState={actionState} name='status' />
      </div>

      <div className='space-y-2 relative'>
        <Label htmlFor='featuredAt'>Featured Date</Label>
        <DatePicker name='featuredAt' className='w-full' />
        <FieldError actionState={actionState} name='featuredAt' />
      </div>

      {actionState.status === 'ERROR' && actionState.message && (
        <p className='text-destructive text-sm font-medium'>{actionState.message}</p>
      )}

      <SubmitButton label='Create Post' loading='Creating...' />
    </form>
  )
}
