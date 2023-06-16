'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { MultiValue } from 'react-select';
import { Input } from '@components/Input';
import { FunnelIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { Category } from '@prisma/client';
import { CategoriesSelect, CategoryOption, mapCategoriesToOptions } from './CategoriesSelect';

type Props = {
  categories: Category[];
};

type Filters = {
  title: string;
  categories?: MultiValue<CategoryOption>;
};

const createQueryString = (filters: Filters) => {
  const { title, categories } = filters;
  const queryObject: { [key: string]: string | string[] } = {};

  if (title) {
    queryObject.title = title;
  }

  if (categories) {
    queryObject.categories = categories.map(cat => cat.value).join(',');
  }

  return queryString.stringify(queryObject);
};

const iconClassName = 'h-5 w-5';

export const FilterPosts = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    title: '',
  });

  useEffect(() => {
    const searchParamsCategories = searchParams.get('categories')
      ? mapCategoriesToOptions(categories.filter(cat => searchParams.get('categories')?.includes(cat.id)))
      : [];
    setFilters({
      title: searchParams.get('title') || '',
      categories: searchParamsCategories,
    });
  }, [searchParams, categories]);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, title: event.target.value });
  };

  const handleCategoriesChange = (selectedCategories: MultiValue<CategoryOption>) => {
    setFilters({ ...filters, categories: selectedCategories });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?${createQueryString(filters)}`);
  };

  return (
    <div className='flex flex-col justify-center items-center mb-8 -mt-4'>
      <button
        onClick={() => setFiltersVisible(prevState => !prevState)}
        className='bg-sky-700 flex items-center py-1 px-4 w-fit text-sm rounded-lg'
      >
        <FunnelIcon className='h-5 w-5' />
        <span className='mx-2'>{filtersVisible ? 'Schowaj filtry' : 'Poka filtry'}</span>
        {filtersVisible ? (
          <ChevronDoubleUpIcon className={iconClassName} />
        ) : (
          <ChevronDoubleDownIcon className={iconClassName} />
        )}
      </button>
      {filtersVisible && (
        <form onSubmit={handleSubmit} className='mt-4 w-full flex flex-col'>
          <Input placeholder='Wyszukiwarka' name='title' value={filters.title} onChange={handleChangeName} />
          <CategoriesSelect
            value={filters.categories || []}
            onChange={handleCategoriesChange}
            categories={categories}
          />
          <button className='bg-sky-700 py-1 px-4 mt-8 text-sm rounded-lg'>Filtruj</button>
          <div className='border-b my-4' />
        </form>
      )}
    </div>
  );
};
