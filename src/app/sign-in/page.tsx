import { SignIn } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  return (
    <div className='flex my-auto h-[600px] mx-4 justify-center items-center'>
      <SignIn signUpUrl='/sign-up' />
    </div>
  );
}
