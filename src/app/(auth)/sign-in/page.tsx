'use client'

import { FieldError } from '@/components/form/FieldError'
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { PATHS } from '@/path'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signIn } from './_actions/signIn'
type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}
const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type='submit' className='border-2'>
      {pending ? loading : label}
    </button>
  )
}

const SignInPage = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_FORM_STATE)
  return (
    <>
      <form action={action} className='p-4 flex flex-col gap-y-2'>
        <div>
          <input name='email' type='email' placeholder='Email' className='border' />
          <FieldError actionState={actionState} name='email' />
        </div>
        <div>
          <input name='password' type='password' placeholder='Password' className='border' />
          <FieldError actionState={actionState} name='password' />
        </div>

        <SubmitButton label='Sign in' loading='Signing in...' />

        <span className='font-bold'>{actionState.message}</span>
      </form>
      <div>
        <Link href={PATHS.signInGithub()}>Sign in with GitHub</Link>
      </div>
    </>
  )
}

export default SignInPage
