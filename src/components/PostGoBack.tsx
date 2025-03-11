'use client';

import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export const PostGoBack = () => {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()}>
        <ArrowUturnLeftIcon className='h-6 w-6 text-gray-400 hover:text-gray-200' />
      </button>
    </>
  );
};
