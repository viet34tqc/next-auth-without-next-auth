'use client'

import useActionFeedback from '@/app/hooks/useActionFeedback'
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
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { Post } from '@prisma/client'
import { useActionState } from 'react'
import { toast } from 'sonner'
import { updatePost } from '../../_actions/updatePost'
import { SubmitButton } from '../SubmitButton'

export function EditPostForm({ post, onSuccess }: { post: Post; onSuccess: () => void }) {
  const [actionState, action] = useActionState(
    (actionState: typeof EMPTY_FORM_STATE, formData: FormData) =>
      updatePost(post.id, actionState, formData),
    EMPTY_FORM_STATE,
  )
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
        <Input id='title' name='title' placeholder='Post title' defaultValue={post.title} />
        <FieldError actionState={actionState} name='title' />
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
        <FieldError actionState={actionState} name='content' />
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
        <FieldError actionState={actionState} name='status' />
      </div>

      {actionState.status === 'ERROR' && actionState.message && (
        <p className='text-destructive text-sm font-medium'>{actionState.message}</p>
      )}

      <SubmitButton label='Update Post' loading='Updating...' />
    </form>
  )
}
