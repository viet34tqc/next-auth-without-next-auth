import { Button } from '@/components/ui/button'
import { signOut } from './_actions/sign-out'

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <Button variant='ghost' type='submit'>
        Sign Out
      </Button>
    </form>
  )
}

export default SignOutButton
