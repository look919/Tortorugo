import React from 'react';

type Props = {
  name: string;
  placeholder: string;
  inputRef: React.Ref<HTMLInputElement>;
  defaultValue?: string;
};

export const Input = ({ inputRef, name, placeholder, defaultValue }: Props) => {
  return (
    <input
      ref={inputRef}
      type='text'
      name={name}
      className='mb-4 p-2 w-full outline-none text-center'
      placeholder={placeholder}
      defaultValue={defaultValue || ''}
    />
  );
};
