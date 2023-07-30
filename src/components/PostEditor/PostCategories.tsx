import { Input } from '@components/Input';
import React, { useEffect } from 'react';

export type NewPostCategory =
  | {
      type: 'new';
      fieldId: number;
      name: string;
      filterable: boolean;
      color: string;
    }
  | {
      type: 'existing';
      fieldId: number;
      id: string;
    };

type PostCategoriesProps = {
  categories: NewPostCategory[];
  currentCategory: number;
  setCurrentCategory: (category: number) => void;
  setCategories: (categoriesState: NewPostCategory[]) => void;
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
  currentCategory,
  setCategories,
  setCurrentCategory,
}: PostCategoriesProps) => {
  const category = categories[currentCategory - 1];

  const handleChangeCategoryType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoriesState = categories.map(category => {
      if (category.fieldId === currentCategory) {
        return event.target.value === 'new'
          ? ({
              ...category,
              type: 'new',
              name: '',
              color: '',
              filterable: false,
            } as const)
          : ({
              ...category,
              type: 'existing',
              id: '',
            } as const);
      }
      return category;
    });

    setCategories(newCategoriesState);
  };

  const handleNewCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'name' | 'filterable' | 'color',
  ) => {
    const newCategoriesState = categories.map(category =>
      category.fieldId === currentCategory && category.type === 'new'
        ? {
            ...category,
            [field]: field === 'filterable' ? event.target.checked : event.target.value,
          }
        : category,
    );

    setCategories(newCategoriesState);
  };

  console.log('category', category);
  return (
    <>
      <h2 className='text-center'>Categories:</h2>
      <div className='my-8 flex justify-evenly'>
        {categoriesDefaultState.map(category => (
          <button
            key={category.fieldId}
            onClick={() => setCurrentCategory(category.fieldId)}
            className={`mx-2 w-16 py-1 ${currentCategory === category.fieldId ? 'bg-sky-700' : 'bg-sky-500'}`}
          >
            {category.fieldId}
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
                name='name'
              />
              <Input
                value={category.type === 'new' ? category.color : ''}
                onChange={e => handleNewCategoryChange(e, 'color')}
                placeholder='color'
                name='color'
              />
            </div>
          ) : (
            <div className='mt-4'>
              <label className='block'>
                Select existing category:
                <select className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2'>
                  <option value=''>Select an existing category</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
