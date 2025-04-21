'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Post } from '@prisma/client'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { EditPostForm } from './EditPostForm'

export function EditPostButton({ post }: { post: Post }) {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Edit className='mr-2 h-4 w-4' />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditPostForm post={post} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
