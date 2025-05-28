'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton({ backUrl }: { backUrl: string }) {
  const router = useRouter()

  return (
    <Button variant='ghost' onClick={() => router.push(backUrl)}>
      <ArrowLeft className='h-4 w-4' />
      Back
    </Button>
  )
}
