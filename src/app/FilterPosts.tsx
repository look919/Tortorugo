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
    <div className='-mt-4 mb-4 flex flex-col items-center justify-center'>
      <button
        onClick={() => setFiltersVisible(prevState => !prevState)}
        className='flex w-fit items-center rounded-lg bg-sky-700 px-4 py-1 text-sm'
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
        <form onSubmit={handleSubmit} className='mt-4 flex w-full flex-col'>
          <Input placeholder='Wyszukiwarka' name='title' value={filters.title} onChange={handleChangeName} />
          <CategoriesSelect
            value={filters.categories || []}
            onChange={handleCategoriesChange}
            categories={categories}
          />
          <button className='mt-8 rounded-lg bg-sky-700 px-4 py-1 text-sm'>Filtruj</button>
        </form>
      )}
    </div>
  );
};
