import { db } from '@lib/db';
import { ClosedPost } from './ClosedPost';
import { FilterPosts } from './FilterPosts';

export default async function HomePage() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const categories = await db.category.findMany({
    where: {
      filterable: true,
    },
  });

  return (
    <section className='w-full'>
      <FilterPosts categories={categories} />
      <div className='w-full '>
        {posts.map(post => (
          <ClosedPost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
