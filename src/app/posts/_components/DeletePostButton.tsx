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
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { deletePost } from '../_actions/deletePost'

const DeleteButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button variant='destructive' type='submit' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}

export const DeletePostButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action] = useActionState(() => deletePost(id), EMPTY_FORM_STATE)

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
          <form action={action}>
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
