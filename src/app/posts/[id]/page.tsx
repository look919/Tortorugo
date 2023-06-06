import Link from 'next/link';
import { db } from 'lib/db';
import { Post } from './Post';

type Props = {
  params: { id: string };
};

const PostPage = async ({ params }: Props) => {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return null;
  }

  return (
    <>
      <Link href="/">Go back</Link>
      <Post post={post} />
    </>
  );
};

export default PostPage;
