import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  const posts = await prisma.post.findMany();
  const categories = await prisma.category.findMany();
  // const categoryToPost = await prisma.categoryToPost.findMany();

  writeFileSync('data.json', JSON.stringify({ posts, categories /* , categoryToPost*/ }, null, 2));
  console.info('Exported data to data.json');
}

exportData().catch(console.error);
