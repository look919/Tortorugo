import { db } from 'lib/db';
import { Post } from '@components/Post';

const RandomPostPage = async () => {
  const totalPosts = await db.post.count();
  const randomIndex = Math.floor(Math.random() * totalPosts);

  const randomPost = await db.post
    .findMany({
      skip: randomIndex,
      take: 1,
      include: {
        categories: true,
      },
    })
    .then(posts => posts[0]);

  if (!randomPost) {
    return null;
  }

  return <Post post={randomPost} />;
};

export default RandomPostPage;
