import React from 'react';

type Props = {
  placeholder: string;
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ inputRef, ...props }: Props) => {
  return (
    <input
      ref={inputRef}
      type='text'
      className='mb-4 w-full border-slate-600 bg-slate-950 p-2 text-center outline-none focus:border'
      {...props}
    />
  );
};
