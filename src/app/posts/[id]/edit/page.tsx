import { redirect } from 'next/navigation';
import { editPost } from '@actions/editPost';
import { PostEditor } from '@components/PostEditor';
import { db } from '@lib/db';
import { EditPostGuard } from './EditGuard';

type Props = {
  params: { id: string };
};

export default async function EditPostPage({ params }: Props) {
  const post = await db.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return redirect('/');
  }

  return (
    <EditPostGuard>
      <PostEditor post={post} onSave={editPost} />
    </EditPostGuard>
  );
}
