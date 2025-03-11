import { Post } from '@components/Post';
import { db } from '@lib/db';

type Props = {
  params: { id: string };
};

const PostPage = async ({ params }: Props) => {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      categories: {
        orderBy: {
          filterable: 'desc',
        },
      },
    },
  });

  if (!post) {
    return null;
  }

  return <Post post={post} />;
};

export default PostPage;
