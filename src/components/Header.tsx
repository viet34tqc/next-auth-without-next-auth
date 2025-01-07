import SignOutButton from '@/app/(auth)/sign-out/sign-out-button';
import { getAuth } from '@/lib/auth/cookie';
import Link from 'next/link';

const Header = async () => {
  const { user } = await getAuth();
  const appNav = (
    <>
      <li>
        <Link href="/">LOGO</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </>
  );
  const authNav = (
    <>
      <li>
        <Link href="/sign-up">Sign Up</Link>
      </li>
      <li>
        <Link href="/login">Sign In</Link>
      </li>
    </>
  );

  return (
    <header>
      <ul>{user ? appNav : authNav}</ul>
    </header>
  );
};

export default Header;
