import { createPost } from '@actions/createPost';
import { PostEditor } from '@components/PostEditor';
import { db } from '@lib/db';
import { NewPostGuard } from './NewPostGuard';

export default async function NewPostPage() {
  const categories = await db.category.findMany();

  return (
    <section className='flex w-full flex-col'>
      <NewPostGuard>
        <PostEditor state='creator' categories={categories} onSave={createPost} />
      </NewPostGuard>
    </section>
  );
}
