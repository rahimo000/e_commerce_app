import { Suspense } from "react"
import { BannerCarousel } from "@/components/banner-carousel"
import { LatestProductsSection } from "@/components/latest-products-section"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading banner...</div>}>
        <BannerCarousel />
      </Suspense>

      <Suspense fallback={<div>Loading latest products...</div>}>
        <LatestProductsSection />
      </Suspense>

      <Suspense fallback={<div>Loading featured categories...</div>}>
        {}
      </Suspense>

      <Suspense fallback={<div>Loading special offers...</div>}>
        {}
      </Suspense>

      <Suspense fallback={<div>Loading why choose us...</div>}>
        {}
      </Suspense>
    </div>
  )
} 