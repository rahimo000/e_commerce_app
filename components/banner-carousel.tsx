"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our latest summer styles",
    image: "/images/banner1.jpg",
    link: "/products?category=summer",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our newest collection",
    image: "/images/banner2.jpg",
    link: "/products?sort=newest",
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Limited time deals on premium products",
    image: "/images/banner3.jpg",
    link: "/products?deals=true",
  },
]

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      // Auto-play functionality
      const interval = setInterval(() => {
        emblaApi.scrollNext()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={banner.id === 1}
                  loading={banner.id === 1 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-bold">{banner.title}</h2>
                    <p className="mt-2 text-lg">{banner.description}</p>
                    <Button
                      asChild
                      className="mt-4"
                      variant="secondary"
                    >
                      <a href={banner.link}>Shop Now</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
} 