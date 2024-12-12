import { signIn } from './_actions/signIn';

const SignInPage = () => {
  return (
    <form action={signIn} className="p-4 flex flex-col gap-y-2">
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
