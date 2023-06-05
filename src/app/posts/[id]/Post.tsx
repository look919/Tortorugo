import type { Category, Post as IPost } from "@prisma/client";
import { ContentRenderer } from "./ContentRenderer";
import { Categories } from "./Categories";
import { PostCreatedAt } from "@/components/PostCreatedAt";

type Props = {
  post: IPost & {
    categories: Category[];
  };
};

export const Post = ({ post }: Props) => {
  return (
    <section className="bg-gradient-to-r from-gray-700 to-slate-800 rounded-lg w-full transition-all relative mb-8 cursor-pointer">
      <PostCreatedAt createdAt={post.createdAt} />
      <div className="pt-2 pb-2 pr-2 mx-2 mb-6 flex items-center justify-between cursor-pointer border-b text-xl text-center">
        <h4>{post.title}</h4>
      </div>
      <ContentRenderer>{post.content}</ContentRenderer>
      {post.categories.length > 0 && (
        <Categories categories={post.categories} />
      )}
    </section>
  );
};
