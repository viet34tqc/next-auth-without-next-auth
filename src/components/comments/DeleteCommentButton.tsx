'use client'

import { deleteComment } from '@/app/posts/comments/_actions/deleteComment'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

type DeleteCommentButtonProps = {
  id: string
}

export function DeleteCommentButton({ id }: DeleteCommentButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      startTransition(async () => {
        await deleteComment(id)
      })
    }
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleDelete}
      disabled={isPending}
      className='text-red-600 hover:text-red-700 hover:bg-red-50'
    >
      <Trash2 className='h-3 w-3' />
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
