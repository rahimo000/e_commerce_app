import { BannerCarousel } from "@/components/banner-carousel"
import { LatestProductsSection } from "@/components/latest-products-section"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  return (
    <main>
      <BannerCarousel />
      <LatestProductsSection />
    </main>
  )
} 