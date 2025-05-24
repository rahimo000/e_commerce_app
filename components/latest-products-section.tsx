import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

type ProductWithCategory = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

async function getLatestProducts(): Promise<ProductWithCategory[]> {
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
}

export async function LatestProductsSection() {
  const products = await getLatestProducts()

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: ProductWithCategory) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category.name}</p>
                <p className="mt-2 font-medium">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 