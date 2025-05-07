'use client'

import useActionFeedback from '@/app/hooks/useActionFeedback'
import { FieldError } from '@/components/FieldError'
import { DatePicker } from '@/components/ui/datepicker'
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
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { useActionState } from 'react'
import { toast } from 'sonner'
import { createPost } from '../../_actions/createPost'
import { SubmitButton } from '../SubmitButton'

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  const [actionState, action] = useActionState(createPost, EMPTY_FORM_STATE)

  useActionFeedback(actionState, {
    onSuccess: () => {
      if (actionState.message) {
        toast.success(actionState.message)
      }
      onSuccess()
    },
    onError: () => {
      if (actionState.message) {
        toast.error(actionState.message)
      }
    },
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
