import { signOut } from './_actions/sign-out';

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default SignOutButton;
