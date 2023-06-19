import { SignUp } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  return (
    <div className='mx-4 flex h-[600px] items-center justify-center'>
      <SignUp signInUrl='/sign-in' afterSignInUrl='/' />
    </div>
  );
}
