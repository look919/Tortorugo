import { db } from '@lib/db';
import { ClosedPost } from './ClosedPost';

export default async function HomePage() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <section className='w-full'>
      <div className='w-full'>
        {posts.map(post => (
          <ClosedPost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
