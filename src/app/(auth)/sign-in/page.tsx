'use client'

import useToastActionFeedback from '@/app/hooks/useToastActionFeedback'
import { SubmitButton } from '@/app/posts/_components/SubmitButton'
import { FieldError } from '@/components/form/FieldError'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EMPTY_FORM_STATE } from '@/lib/constants'
import { PATHS } from '@/path'
import Link from 'next/link'
import { useActionState } from 'react'
import { signIn } from './_actions/sign-in'

const SignInPage = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_FORM_STATE)

  useToastActionFeedback(actionState)

  return (
    <Card className='mx-auto mt-24 max-w-96 animate-in fade-in-10 slide-in-from-top-10 duration-600'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className='flex flex-col gap-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' placeholder='Email' />
            <FieldError actionState={actionState} name='email' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' type='password' placeholder='Password' />
            <FieldError actionState={actionState} name='password' />
          </div>

          <SubmitButton label='Sign In' loading='Signing in...' />

          <div className='flex justify-between items-center text-sm'>
            <Link href={PATHS.signInGithub()} className=' text-primary '>
              Sign in with GitHub
            </Link>
            <Link href={PATHS.signUp()} className='hover:underline'>
              No account yet?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignInPage
