'use client';

import { EMPTY_FORM_STATE } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';
import { FieldError } from '../_component/FieldError';
import { signIn } from './_actions/signIn';
type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};
const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="border-2">
      {pending ? loading : label}
    </button>
  );
};

const SignInPage = () => {
  const [formState, action] = useFormState(signIn, EMPTY_FORM_STATE);
  return (
    <form action={action} className="p-4 flex flex-col gap-y-2">
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border"
        />
        <FieldError formState={formState} name="email" />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border"
        />
        <FieldError formState={formState} name="password" />
      </div>

      <SubmitButton label="Sign in" loading="Signing in..." />

      <span className="font-bold">{formState.message}</span>
    </form>
  );
};

export default SignInPage;
