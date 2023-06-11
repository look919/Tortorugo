import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs/app-beta/client';
import { SignInButton } from '@components/SignInButton';

export const UserProfile = () => {
  return (
    <section className='h-8'>
      <SignedIn>
        <UserButton afterSignOutUrl='/' />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </section>
  );
};
