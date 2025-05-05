'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { deleteToastCookie } from './deleteToastAction'

type Props = {
  message: string
}

const CookieToastRender = ({ message }: Props) => {
  useEffect(() => {
    if (message) {
      toast.success(message)
    }

    deleteToastCookie()
  }, [message])

  return null
}

export default CookieToastRender
