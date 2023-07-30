'use client';

import { ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

export const NewPostGuard = ({ children }: { children: ReactNode }) => {
  const auth = useUser();

  if (!auth.isSignedIn || (auth.isSignedIn && !auth.user.organizationMemberships.some(org => org.role === 'admin'))) {
    return <div>Only admins can create posts</div>;
  }

  return <>{children}</>;
};
