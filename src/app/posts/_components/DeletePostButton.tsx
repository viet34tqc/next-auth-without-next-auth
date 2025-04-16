'use client'

import { Button } from '@/components/ui/button'
import { deletePost } from '../_actions/deletePost'

export const DeletePostButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deletePost(id)
    window.location.href = '/posts'
  }

  return <Button onClick={handleDelete}>Delete</Button>
}
