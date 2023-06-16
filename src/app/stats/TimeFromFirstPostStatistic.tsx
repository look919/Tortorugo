import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import duration from 'dayjs/plugin/duration';
import { Statistic } from './Statistic';

dayjs.extend(duration);

type Props = {
  firstPostCreatedAt: Date;
};

export const TimeFromFirstPostStatistic = ({ firstPostCreatedAt }: Props) => {
  const currentDate = dayjs();
  const durationObj = dayjs.duration(currentDate.diff(dayjs(firstPostCreatedAt)));

  const months = durationObj.months();
  const days = durationObj.days();
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  const result = `${months} miesiące, ${days} dni, ${hours} godziny i ${minutes} minut`;

  return <Statistic name='Ten pierdolnik trwa już' value={result} />;
};
