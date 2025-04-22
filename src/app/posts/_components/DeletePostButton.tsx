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
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { deletePost } from '../_actions/deletePost'

// Submit button with loading state
function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant='destructive' type='submit' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}

export const DeletePostButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Handle delete with UI-controlled navigation
  const deletePostWithId = async () => {
    const result = await deletePost(id)
    if (result.status === 'SUCCESS') {
      setOpen(false)
      router.push(PATHS.posts())
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
          <form action={deletePostWithId} className='inline-block'>
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
