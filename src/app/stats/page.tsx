import { db } from '@lib/db';
import { AverageTimeWaitingForPost } from './AverageTimeWaitingForPost';
import { Statistic } from './Statistic';
import { TimeFromFirstPostStatistic } from './TimeFromFirstPostStatistic';

type PostLength = {
  length: number;
  title: string;
};
type Stats = {
  postCount: number;
  averagePostLength: number;
  maxPostLength: PostLength;
  minPostLength: PostLength;
  averageTimeBetweenTwoPosts: number;
  referencesCount: number;
  filteredCategoriesCount: number;
};

const StatsPage = async () => {
  const posts = await db.post.findMany({
    include: {
      categories: true,
    },
  });

  const stats: Stats = {
    postCount: posts.length,
    averagePostLength: 0,
    maxPostLength: {
      length: 0,
      title: '',
    },
    minPostLength: {
      length: 10000,
      title: '',
    },
    averageTimeBetweenTwoPosts: 0,
    referencesCount: 0,
    filteredCategoriesCount: 0,
  };

  for (let i = 0; i < posts.length; i++) {
    stats.averagePostLength += posts[i].decodedContent.length;
    stats.filteredCategoriesCount += posts[i].categories.filter(cat => !cat.filterable).length;
    stats.referencesCount += posts[i].referencesCount;

    if (posts[i].decodedContent.length > stats.maxPostLength.length) {
      stats.maxPostLength.length = posts[i].decodedContent.length;
      stats.maxPostLength.title = posts[i].title;
    }
    if (posts[i].decodedContent.length < stats.minPostLength.length) {
      stats.minPostLength.length = posts[i].decodedContent.length;
      stats.minPostLength.title = posts[i].title;
    }

    if (i > 0) {
      stats.averageTimeBetweenTwoPosts += posts[i].createdAt.getTime() - posts[i - 1].createdAt.getTime();
    }
  }

  stats.averagePostLength = stats.averagePostLength / posts.length;
  stats.averageTimeBetweenTwoPosts = stats.averageTimeBetweenTwoPosts / posts.length;

  return (
    <div className='flex flex-col w-full px-2 items-start justify-start'>
      <span className='md:text-xl text-base mb-4'>No dobra co my tu mamy:</span>
      <TimeFromFirstPostStatistic firstPostCreatedAt={posts[0].createdAt} />
      <Statistic name='Liczba postów' value={stats.postCount} />
      <Statistic name='Średnia długość posta' value={`${stats.averagePostLength.toFixed(1)} znaków`} />
      <Statistic name='Najdłuższy post' value={`${stats.maxPostLength.title} - ${stats.maxPostLength.length} znaków`} />
      <Statistic name='Najkrótszy post' value={`${stats.minPostLength.title} - ${stats.minPostLength.length} znaków`} />
      <AverageTimeWaitingForPost averageTimeBetweenTwoPosts={stats.averageTimeBetweenTwoPosts} />
      <Statistic name='Kategorie z dupska, bo brakowało pomysłu' value={stats.filteredCategoriesCount} />
      <Statistic name='Mniej lub bardziej subtelnie ukryte odwołania do kultury' value={stats.referencesCount} />
    </div>
  );
};

export default StatsPage;
