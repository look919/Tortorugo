import { cookies } from 'next/headers';
import { db } from '@lib/db';
import { ClosedPost } from './ClosedPost';

export default async function HomePage() {
  const cookieAccess = cookies().get('accessId');
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  async function setCookieOnCorrectInput(data: FormData) {
    'use server';

    const accessKey = data.get('key');

    if (accessKey === '525') {
      cookies().set('accessId', accessKey, {
        maxAge: 30 * 60 * 60,
      });
    }
  }

  return (
    <section className='w-full'>
      {cookieAccess ? (
        <div className='w-full'>
          {posts.map(post => (
            <ClosedPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <form action={setCookieOnCorrectInput as any} className='flex flex-col'>
          <input name='key' placeholder='525' className='mb-2 p-1 bg-transparent border-b' />
          <button type='submit' className='p-4 bg-cyan-600 rounded-sm'>
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
