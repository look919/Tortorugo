import { Post } from '@components/Post';
import { db } from '@lib/db';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  params: { id: string };
};

const PostPage = async ({ params }: Props) => {
  const user = await currentUser();
  const isAuthenticatedUserAnAdmin = user?.privateMetadata.role === 'admin';

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

  return <Post shouldEncodeContent={!isAuthenticatedUserAnAdmin && post.isPrivate} post={post} />;
};

export default PostPage;
