import { PostCreatedAt } from '@components/PostDate';
import type { Category, Post as IPost } from '@prisma/client';
import { Categories } from './Categories';
import { ContentRenderer } from './ContentRenderer';
import { PostGoBack } from './PostGoBack';

type Props = {
  post: IPost & {
    categories: Category[];
  };
};

export const Post = ({ post }: Props) => {
  return (
    <>
      <section className='relative w-full bg-gradient-to-r from-gray-700 to-slate-800 transition-all md:rounded-lg'>
        <PostCreatedAt createdAt={post.createdAt} withTime />
        <div className='mx-1 mb-6 mt-3 flex items-center justify-between border-b p-2 text-center text-lg'>
          <h4>{post.title}</h4>
          <PostGoBack />
        </div>
        <ContentRenderer>{post.content}</ContentRenderer>
        {post.categories.length > 0 && <Categories categories={post.categories} />}
      </section>
    </>
  );
};
