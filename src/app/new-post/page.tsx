'use client';

import { createPost } from '@actions/createPost';
import { useUser } from '@clerk/nextjs';
import { PostEditor } from '@components/PostEditor';

export default function NewPostPage() {
  const auth = useUser();

  if (!auth.isSignedIn || (auth.isSignedIn && !auth.user.organizationMemberships.some(org => org.role === 'admin'))) {
    return <div>Only admins can create posts</div>;
  }

  return (
    <section className='flex w-full flex-col'>
      <PostEditor onSave={createPost} />
    </section>
  );
}
