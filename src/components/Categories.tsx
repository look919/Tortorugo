import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  return (
    <div className="flex text-sm w-full self-end justify-evenly text-center items-center pt-2 rounded-sm overflow-hidden">
      {categories.map((category) => (
        <div
          className="bg-cyan-600 w-full py-1"
          style={{ backgroundColor: category.color }}
          key={category.id}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
