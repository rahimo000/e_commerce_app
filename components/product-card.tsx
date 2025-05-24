import Image from "next/image"
import Link from "next/link"
import { Product, Category } from "@prisma/client"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product & {
    category: Category
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            {product.category.name}
          </p>
          <p className="mt-2 font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  )
} 