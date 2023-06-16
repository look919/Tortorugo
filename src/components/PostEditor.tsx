'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FormPost } from '@actions/types';
import { useUser } from '@clerk/nextjs';
import { Post } from '@prisma/client';
import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { Input } from './Input';

type TinyMCEEditor = {
  getContent: () => string;
};

type Props = {
  post?: Post;
  onSave: (data: FormPost) => Promise<string>;
};

export const PostEditor = ({ post, onSave }: Props) => {
  const auth = useUser();
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleBlur = () => {
    if (!editorRef.current) return;
    sessionStorage.setItem('tinymce', editorRef.current.getContent());
  };

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

    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <Input inputRef={titleRef} name='title' placeholder='Title' defaultValue={post?.title || ''} />
      <TinyMceEditor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onBlur={handleBlur}
        initialValue={post?.decodedContent || sessionStorage.getItem('tinymce') || ''}
        init={{
          height: 550,
          width: '100%',
          plugins: [],
          resize: false,
          toolbar: 'undo redo | ' + 'bold italic backcolor | alignleft aligncenter ' + 'alignright alignjustify',

          content_style:
            'body { font-family: Helvetica, sans-serif; font-size: 14px; background-color: #1a202c; color: #a1a1aa; }',
        }}
      />
      <button onClick={handleSavePost} className='mt-4 bg-sky-700 px-4 py-2'>
        Save Post
      </button>
    </>
  );
};
