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
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { Post } from '@prisma/client'
import { useActionState, useEffect } from 'react'
import { updatePost } from '../../_actions/updatePost'
import { SubmitButton } from '../SubmitButton'

export function EditPostForm({ post, onSuccess }: { post: Post; onSuccess: () => void }) {
  const [formState, action] = useActionState(
    (formState: typeof EMPTY_FORM_STATE, formData: FormData) =>
      updatePost(post.id, formState, formData),
    EMPTY_FORM_STATE,
  )

  useEffect(() => {
    if (formState.status === 'SUCCESS') {
      onSuccess()
    }
  }, [formState.status, onSuccess])

  return (
    <form action={action} className='space-y-6'>
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
