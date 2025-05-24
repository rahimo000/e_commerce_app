import { BannerCarousel } from "@/components/banner-carousel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LatestProductsSection } from "./components/latest-products-section"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <BannerCarousel />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest Products</h2>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
                ))}
              </div>
            }
          >
            <LatestProductsSection />
          </Suspense>
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
      </main>
      <Footer />
    </>
  )
}
