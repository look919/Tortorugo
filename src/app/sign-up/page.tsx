import { SignUp } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  return (
    <div className='flex h-[600px] mx-4  justify-center items-center'>
      <SignUp signInUrl='/sign-in' afterSignInUrl='/' />
    </div>
  );
}
