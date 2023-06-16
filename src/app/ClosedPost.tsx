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
          'relative mb-8 w-full md:rounded-xl from-gray-700 to-slate-800 transition-all',
          isIndexEven ? 'bg-gradient-to-tr' : 'bg-gradient-to-bl',
        )}
      >
        <PostCreatedFormNow createdAt={post.createdAt} />
        <h4 className='w-full mb-6 cursor-pointer text-center pb-1 pt-3.5 text-base'>{post.title}</h4>
      </section>
    </Link>
  );
};
