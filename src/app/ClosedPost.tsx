import { PostCreatedAt } from "@/components/PostCreatedAt";
import type { Post } from "@prisma/client";
import Link from "next/link";

type Props = {
  post: Post;
};

export const ClosedPost = ({ post }: Props) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <section className="bg-gradient-to-r from-gray-700 to-slate-800 rounded-lg w-full transition-all relative mb-8">
        <PostCreatedAt createdAt={post.createdAt} />
        <div className="pt-2 pb-2 pr-2 mx-2 mb-6 text-lg flex items-center justify-between cursor-pointer">
          <h4>{post.title}</h4>
        </div>
      </section>
    </Link>
  );
};
