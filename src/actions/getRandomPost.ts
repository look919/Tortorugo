'use server';

import { db } from '@lib/db';

export const getRandomPost = async () => {
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

  return randomPost;
};
