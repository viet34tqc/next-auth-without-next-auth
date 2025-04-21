'use client'

import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { deletePost } from '../_actions/deletePost'

export const DeletePostButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deletePost(id)
    redirect('/posts')
  }

  return (
    <Button variant={'destructive'} onClick={handleDelete}>
      Delete
    </Button>
  )
}
