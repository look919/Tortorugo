"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pl";

dayjs.extend(relativeTime);
dayjs.locale("pl");

type Props = {
  createdAt: Date;
};

export const PostCreatedAt = ({ createdAt }: Props) => {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-1 rounded-full text-center bg-green-700 text-xs">
      {dayjs(createdAt).fromNow()}
    </div>
  );
};
