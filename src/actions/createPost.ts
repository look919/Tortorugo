'use server';

import { db } from '@lib/db';
import { FormPost } from './types';

export const createPost = async (data: FormPost) => {
  const post = await db.post.create({
    data: {
      title: data.title,
      authorId: 'test',
      referencesCount: data.referencesCount,
      content: data.content,
      isPrivate: data.isPrivate,
      categories: {
        connectOrCreate: data.newPostCategories!.map(category => ({
          where: {
            id: category.type === 'existing' ? category.id : '',
          },
          create: {
            name: category.type === 'new' ? category.name : '',
            color: category.type === 'new' ? category.color : '',
            filterable: category.type === 'new' ? category.filterable : false,
          },
        })),
      },
    },
  });

  return post.id;
};
