import { db } from '@lib/db';
import { ClosedPost } from './ClosedPost';
import { FilterPosts } from './FilterPosts';

type Props = {
  searchParams: { categories: string[]; title: string };
};

export default async function HomePage({ searchParams }: Props) {
  const posts = await db.post.findMany({
    where: {
      title: searchParams.title ? { contains: searchParams.title } : undefined,
      categories: searchParams.categories?.length ? { some: { id: { in: searchParams.categories } } } : undefined,
    },
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
      <div className='w-full'>
        {posts.length > 0 ? (
          <>
            <div className='mb-8 border-b md:-mx-8' />
            {posts.map((post, postIndex) => (
              <ClosedPost key={post.id} post={post} isIndexEven={postIndex % 2 === 0} />
            ))}
          </>
        ) : (
          <div className='w-full text-center text-lg'>Chuja tam, nic nie znalazło</div>
        )}
      </div>
    </section>
  );
}
