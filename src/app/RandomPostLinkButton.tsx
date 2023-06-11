'use client';

import { useRouter } from 'next/navigation';
import { getRandomPost } from '@actions/getRandomPost';

type Props = {
  className: string;
};

export const RandomPostLinkButton = ({ className }: Props) => {
  const router = useRouter();
  const handleGoToRandomPost = async () => {
    const randomPost = await getRandomPost();

    router.push(`/posts/${randomPost.id}`);
  };

  return (
    <button onClick={handleGoToRandomPost} className={className}>
      Losowy
    </button>
  );
};
