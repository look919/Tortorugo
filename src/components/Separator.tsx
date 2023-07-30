import { twMerge } from 'tailwind-merge';

type SeparatorProps = {
  className?: string;
};

export const Separator = ({ className }: SeparatorProps) => {
  return <div className={twMerge('my-4 h-px w-full border-b border-slate-600', className)} />;
};
