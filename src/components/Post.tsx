import { PostCreatedAt } from '@components/PostDate';
import type { Category, Post as IPost } from '@prisma/client';
import { Categories } from './Categories';
import { ContentRenderer } from './ContentRenderer';
import { PostGoBack } from './PostGoBack';
import { encryptionMachine } from '@lib/encryptionMachine';

type Props = {
  shouldEncodeContent: boolean;
  post: IPost & {
    categories: Category[];
  };
};

export const Post = ({ shouldEncodeContent, post }: Props) => {
  const content = shouldEncodeContent ? encryptionMachine.encodeMessage('145', post.content) : post.content;

  return (
    <>
      <section className='relative w-full bg-gradient-to-r from-gray-700 to-slate-800 transition-all md:rounded-lg'>
        <PostCreatedAt createdAt={post.createdAt} withTime />
        <div className='mx-1 mb-6 mt-3 flex items-center justify-between border-b p-2 text-center text-lg'>
          <h4>{post.title}</h4>
          <PostGoBack />
        </div>
        {post.isPrivate && (
          <div className='mx-3 mb-2 rounded-full bg-red-700 px-2 text-center text-xs'>This post is private</div>
        )}
        <ContentRenderer>{content}</ContentRenderer>
        {post.categories.length > 0 && <Categories categories={post.categories} />}
      </section>
    </>
  );
};
