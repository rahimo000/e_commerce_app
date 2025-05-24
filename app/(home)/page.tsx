import { BannerCarousel } from "@/components/banner-carousel"
import { LatestProducts } from "@/components/latest-products"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <BannerCarousel />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest Products</h2>
        <LatestProducts />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category cards will go here */}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Special offer cards will go here */}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature cards will go here */}
        </div>
      </section>
    </div>
  )
} 