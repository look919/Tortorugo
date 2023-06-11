'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FormPost } from '@actions/types';
import { useUser } from '@clerk/nextjs';
import { Post } from '@prisma/client';
import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';

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

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleSavePost = async () => {
    if (!titleInputRef.current || !editorRef.current || !auth.user?.id) {
      throw new Error('Missing required data');
    }

    const postId = await onSave({
      userId: auth.user.id,
      title: titleInputRef.current.value,
      content: editorRef.current.getContent(),
      postId: post?.id,
    });

    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <input
        ref={titleInputRef}
        type='text'
        name='title'
        className='mb-4 p-2 w-full outline-none text-center'
        placeholder='Title'
        defaultValue={post?.title || ''}
      />
      <TinyMceEditor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={post?.decodedContent || '<p></p>'}
        init={{
          height: 550,
          width: '100%',
          menubar: false,
          plugins: [],
          resize: false,
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify',

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
