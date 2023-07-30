import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

export type TinyMCEEditor = {
  getContent: () => string;
};

type TinyMceEditorProps = {
  initialValue?: string;
};

export const TinyMceEditor = React.forwardRef<TinyMCEEditor, TinyMceEditorProps>(({ initialValue }, forwardedRef) => {
  const editorRef = React.useRef<TinyMCEEditor | null>(null);

  const handleBlur = () => {
    if (!editorRef?.current) return;
    if (editorRef.current.getContent()) {
      sessionStorage.setItem('tinymce', editorRef.current.getContent());
    }
  };

  React.useImperativeHandle(forwardedRef, () => editorRef.current as TinyMCEEditor);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      onBlur={handleBlur}
      initialValue={initialValue || ''}
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
  );
});
