'use server';

import { db } from '@lib/db';
import { FormPost } from './types';

export const editPost = async (data: FormPost) => {
  const post = await db.post.update({
    where: {
      id: data.postId,
    },
    data: {
      title: data.title,
      content: data.content,
      referencesCount: data.referencesCount,
    },
  });

  return post.id;
};
