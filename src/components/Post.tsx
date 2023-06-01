"use client";
import type { Post as IPost } from "@prisma/client";
import { ContentRenderer } from "./ContentRenderer";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";
import "dayjs/locale/pl";

dayjs.extend(relativeTime);
dayjs.locale("pl");

type Props = {
  post: IPost;
};

export const Post = ({ post }: Props) => {
  const [isEncapsulated, setIsEncapsulated] = useState(true);

  const chevronClassName = "w-6 h-6 fill-white";

  return (
    <section className="bg-gradient-to-r from-gray-700 to-slate-800 rounded-lg w-full transition-all relative mb-8">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-1 rounded-full text-center bg-green-700 text-xs">
        {dayjs(post.createdAt).fromNow()}
      </div>
      <div
        onClick={() => setIsEncapsulated((prevState) => !prevState)}
        className={twMerge(
          "pt-2 pb-2 pr-2 mx-2 mb-6 text-lg flex items-center justify-between cursor-pointer",
          !isEncapsulated && "border-b pb-2 text-xl text-center"
        )}
      >
        <h4>{post.title}</h4>
        {isEncapsulated ? (
          <ChevronDownIcon className={chevronClassName} />
        ) : (
          <ChevronUpIcon className={chevronClassName} />
        )}
      </div>
      {!isEncapsulated && <ContentRenderer>{post.content}</ContentRenderer>}
    </section>
  );
};
