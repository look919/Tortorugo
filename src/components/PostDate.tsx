'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pl');

type Props = {
  createdAt: Date;
  withTime?: boolean;
};

export const PostCreatedAt = ({ createdAt, withTime }: Props) => {
  return (
    <div className='absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-2 text-center text-xs'>
      {dayjs(createdAt).format(withTime ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY')}
    </div>
  );
};

export const PostCreatedFormNow = ({ createdAt }: Props) => {
  const isOlderThanAYear = Date.now() - new Date(createdAt).getTime() > 1000 * 60 * 60 * 24 * 365;

  if (isOlderThanAYear) {
    return <PostCreatedAt createdAt={createdAt} withTime={false} />;
  }

  return (
    <div className='absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-2 text-center text-xs'>
      {dayjs(createdAt).fromNow()}
    </div>
  );
};
