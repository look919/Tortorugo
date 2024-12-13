'use server';

import { db } from '@lib/db';

export const getRandomPost = async () => {
  const totalPublicPosts = await db.post.count({
    where: {
      isPrivate: false,
    },
  });

  const randomIndex = Math.floor(Math.random() * totalPublicPosts);

  const randomPost = await db.post
    .findMany({
      where: {
        isPrivate: false, // Ensure only public posts are considered
      },
      skip: randomIndex,
      take: 1,
      include: {
        categories: true,
      },
    })
    .then(posts => posts[0]);

  return randomPost;
};
