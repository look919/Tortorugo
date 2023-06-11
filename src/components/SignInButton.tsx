import Link from 'next/link';

export const SignInButton = () => {
  return (
    <Link href='/sign-in' className='bg-sky-700 w-fit py-1 px-4 text-sm rounded-lg'>
      Zaloguj się
    </Link>
  );
};
