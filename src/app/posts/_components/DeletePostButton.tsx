'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PATHS } from '@/path'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { deletePost } from '../_actions/deletePost'

export const DeletePostButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDeletePost = async () => {
    if (isPending) return
    try {
      const result = await deletePost(id)

      if (result.status === 'SUCCESS') {
        startTransition(() => {
          setOpen(false)
          router.push(PATHS.posts())
        })
      } else {
        console.error('Failed to delete post.')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post and remove it from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* We are not using formState to display the error message, we can get the error message from calling the server action */}
          <Button
            variant='destructive'
            onClick={handleDeletePost}
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
