import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching latest products:', error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
} 