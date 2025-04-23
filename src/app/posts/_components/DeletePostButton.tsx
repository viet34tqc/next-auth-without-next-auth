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
import React, { useState } from 'react'
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
  // We'll use a ref to track if the form has been submitted
  const hasSubmittedRef = React.useRef(false)

  // Handle delete with UI-controlled navigation and prevent multiple submissions
  const deletePostWithId = async () => {
    // Prevent submission if already submitted
    if (hasSubmittedRef.current) return

    hasSubmittedRef.current = true

    try {
      const result = await deletePost(id)

      if (result.status === 'SUCCESS') {
        setOpen(false)
        router.push(PATHS.posts())
      } else {
        hasSubmittedRef.current = false
      }
    } catch (error) {
      hasSubmittedRef.current = false
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
          <form action={deletePostWithId} className='inline-block'>
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
