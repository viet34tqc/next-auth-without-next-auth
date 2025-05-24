import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}

export const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type='submit' className='w-full'>
      {pending ? loading : label}
    </Button>
  )
}
