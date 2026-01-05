import React from "react"
import Autoplay from "embla-carousel-autoplay"

import carousel0 from "@assets/images/carousel/carousel-0.webp"
import carousel1 from "@assets/images/carousel/carousel-1.webp"
import carousel2 from "@assets/images/carousel/carousel-2.webp"
import carousel3 from "@assets/images/carousel/carousel-3.webp"
import carousel4 from "@assets/images/carousel/carousel-4.webp"
import carousel5 from "@assets/images/carousel/carousel-5.webp"
import carousel6 from "@assets/images/carousel/carousel-6.webp"
import carousel7 from "@assets/images/carousel/carousel-7.webp"
import carousel8 from "@assets/images/carousel/carousel-8.webp"
import carousel9 from "@assets/images/carousel/carousel-9.webp"


import { CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const CarouselPlugin: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1500 })
  )

  const images = [
    carousel0,
    carousel3,
    carousel2,
    carousel7,
    carousel5,
    carousel8,
    carousel9,
    carousel6,
    carousel4,
    carousel1,
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-sm md:max-w-3xl xl:max-w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <CardContent className="flex aspect-video items-center justify-center p-0">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="invisible md:visible" />
      <CarouselNext className="invisible md:visible" />
    </Carousel>
  )
}
