import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import duration from 'dayjs/plugin/duration';
import { Statistic } from './Statistic';

dayjs.extend(duration);

type Props = {
  averageTimeBetweenTwoPosts: number;
};

export const AverageTimeWaitingForPost = ({ averageTimeBetweenTwoPosts }: Props) => {
  const durationObj = dayjs.duration(averageTimeBetweenTwoPosts);

  const days = durationObj.days();
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  const result = `${days} dni, ${hours} godziny i ${minutes} minut`;

  return <Statistic name='Średni czas oczekiwania na posta' value={result} />;
};
