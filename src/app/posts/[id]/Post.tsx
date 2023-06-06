import { PostCreatedAt } from '@components/PostCreatedAt';
import type { Category, Post as IPost } from '@prisma/client';
import { Categories } from './Categories';
import { ContentRenderer } from './ContentRenderer';

type Props = {
  post: IPost & {
    categories: Category[];
  };
};

export const Post = ({ post }: Props) => {
  return (
    <section className='relative mb-8 w-full cursor-pointer rounded-lg bg-gradient-to-r from-gray-700 to-slate-800 transition-all'>
      <PostCreatedAt createdAt={post.createdAt} />
      <div className='mx-2 mb-6 flex cursor-pointer items-center justify-between border-b pb-2 pr-2 pt-2 text-center text-xl'>
        <h4>{post.title}</h4>
      </div>
      <ContentRenderer>{post.content}</ContentRenderer>
      {post.categories.length > 0 && <Categories categories={post.categories} />}
    </section>
  );
};
