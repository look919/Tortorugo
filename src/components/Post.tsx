import { db } from "@/lib/db";
import React from "react";
import { ContentRenderer } from "./ContentRenderer";

type Props = {
  postId: string;
};

export const Post = async ({ postId }: Props) => {
  const post = await db.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  return (
    <section className="bg-slate-600 rounded-lg">
      <div className="border-b pt-4 pb-2 mx-2 mb-6 text-2xl">
        <h4>{post.title}</h4>
      </div>
      <ContentRenderer>{post.content}</ContentRenderer>
    </section>
  );
};
