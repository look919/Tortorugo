import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

type Data = {
  categories: { id: string; color: string; name: string }[];
  posts: {
    id: string;
    authorId: string;
    isPrivate: boolean;
    referencesCount: number;
    title: string;
    content: string;
  }[];
  categoryToPost: { A: string; B: string }[];
};

const prisma = new PrismaClient();
const data: Data = JSON.parse(readFileSync('data.json', 'utf-8'));

async function importData() {
  console.info('Inserting categories...');
  await prisma.category.createMany({ data: data.categories });

  console.info('Inserting posts...');
  await prisma.post.createMany({ data: data.posts });

  console.info('Inserting category-post relations...');
  for (const relation of data.categoryToPost) {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "_PostCategories" ("A", "B") VALUES ($1, $2)`,
        relation.A,
        relation.B,
      );
    } catch (err: unknown) {
      console.error(err);
    }
  }

  console.info('Import complete!');
}

importData().catch(console.error);
