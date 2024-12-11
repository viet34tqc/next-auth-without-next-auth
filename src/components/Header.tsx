import SignOutButton from '@/app/(auth)/sign-out/sign-out-button';
import Link from 'next/link';

const Header = () => {
  const appNav = (
    <>
      <li>
        <Link href="/">LOGO</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
    </>
  );
  const authNav = (
    <>
      <li>
        <Link href="/sign-up">Sign Up</Link>
      </li>
      <li>
        <Link href="/sign-in">Sign In</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </>
  );

  return (
    <header>
      <ul>{appNav}</ul>
      <ul>{authNav}</ul>
    </header>
  );
};

export default Header;
