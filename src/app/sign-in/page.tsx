import { SignIn } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  return (
    <div className='mx-4 my-auto flex h-[600px] items-center justify-center'>
      <SignIn signUpUrl='/sign-up' />
    </div>
  );
}
