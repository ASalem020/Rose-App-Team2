"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/heroBg1.png", alt: "Slide 1" },
  { src: "/images/carousal1.png", alt: "Slide 2" },
  { src: "/images/carousal2.png", alt: "Slide 3" },
  { src: "/images/carousal3.png", alt: "Slide 4" },
];

export default function CarouselDemo() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="relative w-[955px] h-[440px]"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card className="h-full overflow-hidden">
              <CardContent className="relative h-[440px] p-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold max-w-[320px]">
                      Say it with flowers
                    </h3>
                    <p>Elegant gifts for every special moment.</p>
                    <Button
                      asChild
                      className="w-fit rounded-xl bg-white text-maroon-600"
                    >
                      <Link href="/products">I'm buying!</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2">
        <button
          onClick={() => api?.scrollPrev()}
          className="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-red-600">
          <ChevronLeft size={30} />
        </button>

        <button
          onClick={() => api?.scrollNext()}
          className="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-red-600"
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-10 flex gap-3">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`cursor-pointer h-3 rounded-full transition-all ${
              current === index
                ? "w-8 bg-red-600"
                : "w-3 bg-white/70"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
