'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pl');

type Props = {
  createdAt: Date;
};

export const PostCreatedAt = ({ createdAt }: Props) => {
  return (
    <div className='absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-2 text-center text-xs'>
      {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
    </div>
  );
};

export const PostCreatedFormNow = ({ createdAt }: Props) => {
  return (
    <div className='absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-2 text-center text-xs'>
      {dayjs(createdAt).fromNow()}
    </div>
  );
};
