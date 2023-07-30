'use client';

import { CategoriesSelect, CategoryOption } from '@components/CategoriesSelect';
import { MultiValue } from 'react-select';
import { Input } from '@components/Input';
import { Category } from '@prisma/client';
import React from 'react';
import { NewPostCategory } from '@actions/types';

type PostCategoriesProps = {
  categories: Category[];
  categoriesState: NewPostCategory[];
  currentCategory: number;
  setCurrentCategory: (category: number) => void;
  setCategoriesState: (categoriesState: NewPostCategory[]) => void;
};

export const categoriesDefaultState = [1, 2, 3, 4, 5].map(
  i =>
    ({
      type: 'new',
      fieldId: i,
      name: '',
      color: '',
      filterable: false,
    } as const),
);

export const PostCategories = ({
  categories,
  categoriesState,
  currentCategory,
  setCategoriesState,
  setCurrentCategory,
}: PostCategoriesProps) => {
  const category = categoriesState[currentCategory - 1];
  const currentExistingCategory =
    category.type === 'existing' ? categories.find(cat => cat.id === category.id) : undefined;
  const currentExistingCategorySelectValue = currentExistingCategory
    ? [
        {
          label: currentExistingCategory?.name || '',
          value: currentExistingCategory?.id || '',
          optionColor: currentExistingCategory?.color || '',
          selectedColor: currentExistingCategory?.color || '#4B5563',
        },
      ]
    : [];

  const handleChangeCategoryType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoriesState = categoriesState.map(categoryState => {
      if (categoryState.fieldId === currentCategory) {
        return event.target.value === 'new'
          ? ({
              ...categoryState,
              type: 'new',
              name: '',
              color: '',
              filterable: false,
            } as const)
          : ({
              ...categoryState,
              type: 'existing',
              id: '',
            } as const);
      }
      return categoryState;
    });

    setCategoriesState(newCategoriesState);
  };

  const handleNewCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'name' | 'filterable' | 'color',
  ) => {
    const newCategoriesState = categoriesState.map(categoryState =>
      categoryState.fieldId === currentCategory && categoryState.type === 'new'
        ? {
            ...categoryState,
            [field]: field === 'filterable' ? event.target.checked : event.target.value,
          }
        : categoryState,
    );

    setCategoriesState(newCategoriesState);
  };

  const handleExistingCategoryChange = (selectedCategory: MultiValue<CategoryOption>) => {
    const newCategoriesState = categoriesState.map(categoryState =>
      categoryState.fieldId === currentCategory && categoryState.type === 'existing'
        ? {
            ...categoryState,
            id: selectedCategory[0].value,
          }
        : categoryState,
    );
    setCategoriesState(newCategoriesState);
  };

  return (
    <>
      <h2 className='text-center'>Categories:</h2>
      <div className='my-8 flex justify-evenly'>
        {categoriesDefaultState.map(defaultCategory => (
          <button
            key={defaultCategory.fieldId}
            onClick={() => setCurrentCategory(defaultCategory.fieldId)}
            className={`mx-2 w-16 py-1 ${currentCategory === defaultCategory.fieldId ? 'bg-sky-700' : 'bg-sky-500'}`}
          >
            {defaultCategory.fieldId}
          </button>
        ))}
      </div>
      <div>
        <div className='flex flex-col border-y border-slate-600 px-6 py-2 md:-mx-8'>
          <label className='mb-2 flex items-center'>
            New Category
            <input
              type='radio'
              value='new'
              checked={category.type === 'new'}
              onChange={handleChangeCategoryType}
              className='ml-2'
            />
          </label>
          <label className='flex items-center'>
            Existing Category
            <input
              type='radio'
              value='existing'
              checked={category.type === 'existing'}
              onChange={handleChangeCategoryType}
              className='ml-2'
            />
          </label>
        </div>
        <div className='flex h-40 w-full'>
          {category.type === 'new' ? (
            <div className='mt-4'>
              <label className='mb-2 flex items-center'>
                Filterable:
                <input
                  type='checkbox'
                  checked={category.type === 'new' ? category.filterable : false}
                  onChange={e => handleNewCategoryChange(e, 'filterable')}
                  className='ml-2'
                />
              </label>

              <Input
                value={category.type === 'new' ? category.name : ''}
                onChange={e => handleNewCategoryChange(e, 'name')}
                placeholder='name'
              />
              <Input
                value={category.type === 'new' ? category.color : ''}
                onChange={e => handleNewCategoryChange(e, 'color')}
                placeholder='color'
              />
            </div>
          ) : (
            <div className='mt-4 flex w-full'>
              <CategoriesSelect
                categories={categories}
                value={currentExistingCategorySelectValue}
                onChange={handleExistingCategoryChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
