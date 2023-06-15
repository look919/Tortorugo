import { Category } from '@prisma/client';

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  return (
    <div className='md:flex w-full md:items-center md:justify-evenly grid grid-cols-6 self-end overflow-hidden rounded-sm pt-2 text-center text-sm'>
      {categories.map((category, index) => (
        <div
          className='w-full bg-cyan-600 py-1'
          style={{ backgroundColor: category.color, gridColumn: index >= 2 ? 'span 2 / span 2' : 'span 3 / span 3' }}
          key={category.id}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
