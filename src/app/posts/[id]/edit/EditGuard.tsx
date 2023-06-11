'use client';

import { ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

export const EditPostGuard = ({ children }: { children: ReactNode }) => {
  const auth = useUser();

  if (!auth.isSignedIn || (auth.isSignedIn && !auth.user.organizationMemberships.some(org => org.role === 'admin'))) {
    return <div>Only admins can edit posts</div>;
  }

  return <>{children}</>;
};
