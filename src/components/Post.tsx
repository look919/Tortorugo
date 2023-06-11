import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs/app-beta';
import { PostCreatedAt } from '@components/PostCreatedAt';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import type { Category, Post as IPost } from '@prisma/client';
import { Categories } from './Categories';
import { ContentRenderer } from './ContentRenderer';
import { SignInButton } from './SignInButton';

type Props = {
  post: IPost & {
    categories: Category[];
  };
};

export const Post = ({ post }: Props) => {
  const { userId } = auth();

  return (
    <>
      <SignedOut>
        <div className='text-center mb-16 border p-4 rounded-sm flex flex-col items-center'>
          <span className='text-sm mb-4'>Jak chcesz rozkodować ten bełkot, to się zaloguj, nie ma tak za darmo</span>
          <SignInButton />
        </div>
      </SignedOut>
      <section className='relative mb-8 w-full cursor-pointer rounded-lg bg-gradient-to-r from-gray-700 to-slate-800 transition-all'>
        <PostCreatedAt createdAt={post.createdAt} />
        <div className='mx-1 mb-6 flex cursor-pointer items-center justify-between border-b p-2 text-center text-lg mt-3'>
          <h4>{post.title}</h4>
          <Link href='/'>
            <ArrowUturnLeftIcon className='h-6 w-6 text-gray-400 hover:text-gray-200' />
          </Link>
        </div>
        <ContentRenderer>{userId ? post.decodedContent : post.encodedContent}</ContentRenderer>
        {post.categories.length > 0 && <Categories categories={post.categories} />}
      </section>
    </>
  );
};
