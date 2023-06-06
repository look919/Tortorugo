import Link from 'next/link';
import { PostCreatedAt } from '@components/PostCreatedAt';
import type { Post } from '@prisma/client';

type Props = {
  post: Post;
};

export const ClosedPost = ({ post }: Props) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <section className='relative mb-8 w-full rounded-lg bg-gradient-to-r from-gray-700 to-slate-800 transition-all'>
        <PostCreatedAt createdAt={post.createdAt} />
        <div className='mx-2 mb-6 flex cursor-pointer items-center justify-between pb-2 pr-2 pt-2 text-lg'>
          <h4>{post.title}</h4>
        </div>
      </section>
    </Link>
  );
};
