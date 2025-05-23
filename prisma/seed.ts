import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const categories = [
    { name: 'T-shirt', image: '/images/c-tshirts.jpg', description: 'A collection of stylish T-shirts.' },
    { name: 'Jeans', image: '/images/c-jeans.jpg', description: 'Classic and modern jeans for every style.' },
    { name: 'Shoes', image: '/images/c-shoes.jpg', description: 'Comfortable and elegant shoes for all occasions.' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
  }

  // Seed Products
  const products = [
    {
      id: 'tshirt-1',
      name: 'T-shirt 1',
      description: 'A comfortable T-shirt.',
      price: 20.0,
      images: ['/images/p11-1.jpg'],
      categoryId: 'T-shirt',
      stock: 100,
    },
    {
      id: 'tshirt-2',
      name: 'T-shirt 2',
      description: 'Another stylish T-shirt.',
      price: 25.0,
      images: ['/images/p11-2.jpg'],
      categoryId: 'T-shirt',
      stock: 80,
    },
    {
      id: 'jeans-1',
      name: 'Jeans 1',
      description: 'Classic blue jeans.',
      price: 50.0,
      images: ['/images/p21-1.jpg'],
      categoryId: 'Jeans',
      stock: 60,
    },
    {
      id: 'jeans-2',
      name: 'Jeans 2',
      description: 'Slim fit jeans.',
      price: 55.0,
      images: ['/images/p21-2.jpg'],
      categoryId: 'Jeans',
      stock: 70,
    },
    {
      id: 'shoes-1',
      name: 'Shoes 1',
      description: 'Comfortable sneakers.',
      price: 80.0,
      images: ['/images/p31-1.jpg'],
      categoryId: 'Shoes',
      stock: 50,
    },
    {
      id: 'shoes-2',
      name: 'Shoes 2',
      description: 'Elegant dress shoes.',
      price: 100.0,
      images: ['/images/p31-2.jpg'],
      categoryId: 'Shoes',
      stock: 40,
    },
  ];

  // Get category IDs by name
  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((cat) => [cat.name, cat.id])
  );

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: { ...product, categoryId: categoryMap[product.categoryId] },
      create: { ...product, categoryId: categoryMap[product.categoryId] },
    });
  }

  // Seed Users
  const users = [
    {
      email: 'user1@example.com',
      name: 'User One',
      password: await hash('password1', 10),
      role: 'USER' as const,
    },
    {
      email: 'user2@example.com',
      name: 'User Two',
      password: await hash('password2', 10),
      role: 'ADMIN' as const,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 