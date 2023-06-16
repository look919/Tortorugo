type Props = {
  name: string;
  value: number | string;
};

export const Statistic = ({ name, value }: Props) => (
  <div className='mb-2 last:mb-0 md:text-base text-xs'>
    <span className='text-slate-400 mr-2'>{`${name}:`}</span>
    <span className='text-white'>{value}</span>
  </div>
);
