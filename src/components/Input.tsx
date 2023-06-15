import React from 'react';

type Props = {
  name: string;
  placeholder: string;
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ inputRef, ...props }: Props) => {
  return (
    <input ref={inputRef} type='text' className='mb-4 p-2 w-full bg-slate-950 outline-none text-center' {...props} />
  );
};
