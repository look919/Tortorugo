import { db } from '@lib/db';
import { ClosedPost } from './ClosedPost';
import { FilterPosts } from './FilterPosts';
import { Post } from '@prisma/client';
import { Separator } from '@components/Separator';

type Props = {
  searchParams: { categories: string[]; search: string };
};

interface SearchParams {
  search?: string;
  categories?: string[];
}

type WhereConditions = {
  OR?: {
    title?: { contains: string };
    decodedContent?: { contains: string };
  }[];
  categories?: { some: { id: { in: string[] } } };
};

async function getPosts(searchParams: SearchParams): Promise<Post[]> {
  const whereConditions: WhereConditions = {};

  if (searchParams.search) {
    whereConditions.OR = [
      { title: { contains: searchParams.search } },
      { decodedContent: { contains: searchParams.search } },
    ];
  }

  if (searchParams.categories?.length) {
    whereConditions.categories = { some: { id: { in: searchParams.categories } } };
  }

  const posts: Post[] = await db.post.findMany({
    where: whereConditions,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
}

export default async function HomePage({ searchParams }: Props) {
  const posts = await getPosts(searchParams);

  const categories = await db.category.findMany({
    where: {
      filterable: true,
    },
  });

  return (
    <section className='w-full'>
      <FilterPosts categories={categories} />
      <div className='md:-mx-8'>
        <Separator className='mb-12' />
      </div>
      <div className='w-full'>
        {posts.length > 0 ? (
          <>
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
