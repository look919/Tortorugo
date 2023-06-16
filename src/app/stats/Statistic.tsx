type Props = {
  name: string;
  value: number | string;
};

export const Statistic = ({ name, value }: Props) => (
  <div className='flex items-start mb-2 last:mb-0'>
    <span className='text-slate-400 mr-2 break-keep whitespace-nowrap'>{`${name}:`}</span>
    <span className='text-white'>{value}</span>
  </div>
);
