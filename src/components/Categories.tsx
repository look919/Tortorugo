import { Category } from '@prisma/client';

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  return (
    <div className='flex w-full items-center justify-evenly self-end overflow-hidden rounded-sm pt-2 text-center text-sm'>
      {categories.map(category => (
        <div className='w-full bg-cyan-600 py-1' style={{ backgroundColor: category.color }} key={category.id}>
          {category.name}
        </div>
      ))}
    </div>
  );
};
