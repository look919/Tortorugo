'use server';

import { OneTimeKey } from 'encode-wir';
import { db } from '@lib/db';
import { encryptionMachine } from '@lib/encryptionMachine';
import { FormPost } from './types';

export const createPost = async (data: FormPost) => {
  const post = await db.post.create({
    data: {
      title: data.title,
      authorId: data.userId,
      decodedContent: data.content,
      encodedContent: encryptionMachine.encodeMessage(process.env.NEXT_PUBLIC_SECRET_KEY as OneTimeKey, data.content),
    },
  });

  return post.id;
};
