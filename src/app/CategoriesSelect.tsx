import React from 'react';
import ReactSelect, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import { Category } from '@prisma/client';

export type CategoryOption = {
  label: string;
  value: string;
  optionColor: string;
  selectedColor: string;
};

type Props = {
  value: MultiValue<CategoryOption>;
  categories: Category[];
  onChange: (newValue: MultiValue<CategoryOption>, actionMeta: ActionMeta<CategoryOption>) => void;
};

const customStyles: StylesConfig<CategoryOption> = {
  control: provided => ({
    ...provided,
    color: 'white',
    backgroundColor: '#020617',
    border: '1px solid gray',
    cursor: 'pointer',
    minHeight: '2.5rem',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: 'white',
    borderRadius: 'none',
    backgroundColor: state.data.selectedColor,
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    borderRadius: 'none',
    backgroundColor: state.data.selectedColor,
    ':hover': {
      backgroundColor: '#334155',
      color: '#020617',
    },
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#0f172a',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.data.optionColor,
  }),
  input: provided => ({
    ...provided,
    color: 'white',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingLeft: '2rem',
  }),
};

export const CategoriesSelect = ({ categories, ...props }: Props) => {
  return (
    <ReactSelect
      isMulti
      options={categories.map((category, index) => ({
        label: category.name,
        value: category.id,
        selectedColor: category.color,
        optionColor: index % 2 === 0 ? '#1e293b' : '#0f172a',
      }))}
      placeholder='Wybierz kategorie'
      noOptionsMessage={() => 'Nie ma takiej kategorii'}
      styles={customStyles}
      {...props}
    />
  );
};
