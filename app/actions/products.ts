'use server'

import { prisma } from "@/lib/prisma"

export type ProductWithCategory = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

export async function getLatestProducts(): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    return products
  } catch (error) {
    console.error('Error fetching latest products:', error)
    return []
  }
} 