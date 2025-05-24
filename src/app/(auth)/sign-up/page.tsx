'use client'

import useToastActionFeedback from '@/app/hooks/useToastActionFeedback'
import { FieldError } from '@/components/form/FieldError'
import { SubmitButton } from '@/components/posts/SubmitButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EMPTY_FORM_STATE } from '@/lib/constants'
import Link from 'next/link'
import { useActionState } from 'react'
import signUp from './_actions/sign-up'

const SignUpPage = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_FORM_STATE)

  useToastActionFeedback(actionState)

  return (
    <Card className='mx-auto mt-24 max-w-96 animate-in fade-in-10 slide-in-from-top-10 duration-600'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className='flex flex-col gap-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' name='username' type='text' placeholder='Username' />
            <FieldError actionState={actionState} name='username' />
          </div>

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

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
            />
            <FieldError actionState={actionState} name='confirmPassword' />
          </div>

          <SubmitButton label='Sign Up' loading='Signing up...' />
          <Link className='text-sm text-center hover:underline' href='/sign-in'>
            Got an account? Sign in
          </Link>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUpPage
