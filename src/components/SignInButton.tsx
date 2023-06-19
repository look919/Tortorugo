import Link from 'next/link';

export const SignInButton = () => {
  return (
    <Link href='/sign-in' className='w-fit rounded-lg bg-sky-700 px-4 py-1 text-sm'>
      Zaloguj się
    </Link>
  );
};
