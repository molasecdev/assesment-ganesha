import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function runSeed() {
  const books = [
    { title: 'Mathematics 101', price: 120000 },
    { title: 'Physics Basics', price: 95000 },
    { title: 'Introduction to Chemistry', price: 110000 },
    { title: 'Biology Fundamentals', price: 85000 },
    { title: 'English Grammar & Composition', price: 75000 },
    { title: 'World History: Ancient to Modern', price: 130000 },
    { title: 'Geography Essentials', price: 80000 },
    { title: 'Computer Science Basics', price: 150000 },
    { title: 'Economics for Beginners', price: 95000 },
    { title: 'Art & Culture Studies', price: 70000 },
  ];

  console.log('🌱 Seeding books...');

  for (const book of books) {
    await prisma.book.upsert({
      where: { title: book.title }, // hindari duplikat jika seed dijalankan ulang
      update: {},
      create: book,
    });
  }

  console.log(`✅ ${books.length} books seeded successfully!`);
}

async function main() {
  await runSeed();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
