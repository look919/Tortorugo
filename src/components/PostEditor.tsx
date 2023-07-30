'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormPost } from '@actions/types';
import { useUser } from '@clerk/nextjs';
import { Post } from '@prisma/client';
import { Input } from './Input';
import { Separator } from './Separator';
import { TinyMCEEditor, TinyMceEditor } from './PostEditor/TinyMceEditor';
import { PostCategories, NewPostCategory, categoriesDefaultState } from './PostEditor/PostCategories';

type Props = {
  post?: Post;
  onSave: (data: FormPost) => Promise<string>;
};

export const PostEditor = ({ post, onSave }: Props) => {
  const auth = useUser();
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [currentCategory, setCurrentCategory] = useState<number>(1);
  const [categories, setCategories] = useState<NewPostCategory[]>(categoriesDefaultState);

  const handleSavePost = async () => {
    if (!titleRef.current || !editorRef.current?.getContent() || !auth.user?.id) {
      throw new Error('Missing required data');
    }

    const postId = await onSave({
      userId: auth.user.id,
      title: titleRef.current.value,
      content: editorRef.current.getContent(),
      postId: post?.id,
    });

    sessionStorage.removeItem('tinymce');
    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <Input inputRef={titleRef} name='title' placeholder='Title' defaultValue={post?.title || ''} />
      <TinyMceEditor ref={editorRef} initialValue={post?.decodedContent} />
      <div className='md:-mx-8'>
        <Separator className='my-6' />
      </div>
      <PostCategories
        categories={categories}
        currentCategory={currentCategory}
        setCategories={setCategories}
        setCurrentCategory={setCurrentCategory}
      />
      <button onClick={handleSavePost} className='my-4 bg-sky-700 px-4 py-2'>
        Save Post
      </button>
    </>
  );
};
