type Props = {
  name: string;
  value: number | string;
};

export const Statistic = ({ name, value }: Props) => (
  <div className='mb-2 text-xs last:mb-0 md:text-base'>
    <span className='mr-2 text-slate-400'>{`${name}:`}</span>
    <span className='text-white'>{value}</span>
  </div>
);
