import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { PostCreatedFormNow } from '@components/PostDate';
import type { Post } from '@prisma/client';

type Props = {
  post: Post;
  isIndexEven: boolean;
};

export const ClosedPost = ({ post, isIndexEven }: Props) => {
  return (
    <Link href={`/posts/${post.id}`} className='w-full'>
      <section
        className={twMerge(
          'relative mb-8 w-full from-gray-700 to-slate-800 transition-all md:rounded-xl',
          isIndexEven ? 'bg-gradient-to-l' : 'bg-gradient-to-r',
        )}
      >
        <PostCreatedFormNow createdAt={post.createdAt} />
        <h4 className='mb-6 w-full cursor-pointer pb-1 pt-3.5 text-center text-base'>{post.title}</h4>
      </section>
    </Link>
  );
};
