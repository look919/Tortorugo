'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormPost, NewPostCategory } from '@actions/types';
import { useUser } from '@clerk/nextjs';
import { Category, Post } from '@prisma/client';
import { Input } from '../Input';
import { Separator } from '../Separator';
import { TinyMCEEditor, TinyMceEditor } from './TinyMceEditor';
import { PostCategories, categoriesDefaultState } from './PostCategories';

type Props = {
  state: 'editor' | 'creator';
  categories: Category[];
  post?: Post & {
    categories: Category[];
  };
  onSave: (data: FormPost) => Promise<string>;
};

const mapExistingPostCategories = (postCategories?: Category[]): NewPostCategory[] => {
  if (!Array.isArray(postCategories)) return categoriesDefaultState;

  return postCategories.map((category, i) => ({
    type: 'existing',
    id: category.id,
    fieldId: i + 1,
  }));
};

export const PostEditor = ({ state, categories, post, onSave }: Props) => {
  const auth = useUser();
  const router = useRouter();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState(post?.title || '');
  const [referencesCount, setReferencesCount] = useState(post?.referencesCount.toString() || '');
  const [currentCategory, setCurrentCategory] = useState<number>(1);
  const [categoriesState, setCategoriesState] = useState<NewPostCategory[]>(
    mapExistingPostCategories(post?.categories),
  );

  const handleSavePost = async () => {
    if (!title || !editorRef.current?.getContent() || !auth.user?.id) {
      throw new Error('Missing required data');
    }

    const postId = await onSave({
      authorId: auth.user.id,
      title,
      isPrivate: true,
      referencesCount: parseInt(referencesCount, 10),
      content: editorRef.current.getContent(),
      newPostCategories: state === 'creator' ? categoriesState : undefined,
      postId: state === 'editor' ? post?.id : undefined,
    });

    sessionStorage.removeItem('tinymce');
    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title'
        defaultValue={post?.title || ''}
      />
      <Input
        value={referencesCount}
        onChange={e => setReferencesCount(e.target.value)}
        placeholder='References count'
        defaultValue={post?.title || ''}
      />

      <TinyMceEditor editorRef={editorRef} initialValue={post?.content} />
      <div className='md:-mx-8'>
        <Separator className='my-6' />
      </div>
      {state === 'creator' && (
        <PostCategories
          categories={categories}
          categoriesState={categoriesState}
          currentCategory={currentCategory}
          setCategoriesState={setCategoriesState}
          setCurrentCategory={setCurrentCategory}
        />
      )}

      <button onClick={handleSavePost} className='my-4 bg-sky-700 px-4 py-2'>
        Save Post
      </button>
    </>
  );
};
