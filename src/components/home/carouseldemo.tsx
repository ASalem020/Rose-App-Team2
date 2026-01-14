
// import Image from "next/image";
// import { ChevronLeft , ChevronRight} from 'lucide-react';
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const slides = [
//   { src: "/images/heroBg1.png", alt: "Slide 1" },
//   { src: "/images/carousal1.png", alt: "Slide 2" },
//   { src: "/images/carousal2.png", alt: "Slide 3" },
//   { src: "/images/carousal3.png", alt: "Slide 4" },
// ];

// export default function CarouselDemo() {
//  return (
//     <Carousel className="relative w-[955px] h-[440px]">
//       <CarouselContent>
//         {slides.map((slide, index) => (
//           <CarouselItem key={index}>
//             <Card className="h-full overflow-hidden">
//               <CardContent className="relative h-[440px] p-0">
//                 <Image
//                   src={slide.src}
//                   alt={slide.alt}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
//                 <div className="absolute inset-0 flex items-end p-6 text-white">
//                   <div className="flex flex-col gap-3">
//                     <h3 className="text-4xl font-semibold max-w-[320px]">
//                       Say it with flowers
//                     </h3>
//                     <p>Elegant gifts for every special moment.</p>
//                     <Button asChild className="w-fit rounded-xl bg-white text-maroon-600">
//                       <Link href="/products">I'm buying!</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       {/* <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2 items-center ">
//         <CarouselPrevious className="static h-9 w-9 rounded-full  bg-white/80 text-red-600600 translate-y-1" />
//         <ChevronLeft size={32} strokeWidth={1.75} absoluteStrokeWidth />
//         <CarouselNext className="static h-9 w-9 rounded-full bg-white/80 text-red-600 translate-y-1" />
//         <ChevronRight size={32} strokeWidth={1.75} absoluteStrokeWidth />
//       </div> */}
//        <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2 items-center">
//   {/* Custom Left Arrow */}
//   <button
//     onClick={() => carouselRef.current?.emblaApi?.scrollPrev()}
//     className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-red-600"
//   >
//     <ChevronLeft size={32} strokeWidth={1.75} />
//   </button>

//   {/* Custom Right Arrow */}
//   <button
//     onClick={() => carouselRef.current?.emblaApi?.scrollNext()}
//     className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-red-600"
//   >
//     <ChevronRight size={32} strokeWidth={1.75} />
//   </button>
// </div>
      
//     </Carousel>
//   );
// }
// "use client";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { useRef, useState, useEffect } from "react";

// const slides = [
//   { src: "/images/heroBg1.png", alt: "Slide 1" },
//   { src: "/images/carousal1.png", alt: "Slide 2" },
//   { src: "/images/carousal2.png", alt: "Slide 3" },
//   { src: "/images/carousal3.png", alt: "Slide 4" },
// ];

// export default function CarouselDemo() {
//   const carouselRef = useRef<any>(null); // تعريف ref
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // متابعة تغير السلايد
//   useEffect(() => {
//     const embla = carouselRef.current?.emblaApi;
//     if (!embla) return;

//     const onSelect = () => {
//       setCurrentIndex(embla.selectedScrollSnap());
//     };

//     embla.on("select", onSelect);
//     return () => embla.off("select", onSelect);
//   }, []);

//   const handlePrev = () => carouselRef.current?.emblaApi?.scrollPrev();
//   const handleNext = () => carouselRef.current?.emblaApi?.scrollNext();

//   return (
//     <Carousel className="relative w-[955px] h-[440px]" ref={carouselRef}>
//       <CarouselContent>
//         {slides.map((slide, index) => (
//           <CarouselItem key={index}>
//             <Card className="h-full overflow-hidden">
//               <CardContent className="relative h-[440px] p-0">
//                 <Image
//                   src={slide.src}
//                   alt={slide.alt}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
//                 <div className="absolute inset-0 flex items-end p-6 text-white">
//                   <div className="flex flex-col gap-3">
//                     <h3 className="text-4xl font-semibold max-w-[320px]">
//                       Say it with flowers
//                     </h3>
//                     <p>Elegant gifts for every special moment.</p>
//                     <Button asChild className="w-fit rounded-xl bg-white text-maroon-600">
//                       <Link href="/products">I'm buying!</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       {/* Custom Arrows */}
//       <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2 items-center">
//         <button
//           onClick={handlePrev}
//           className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-red-600"
//         >
//           <ChevronLeft size={32} strokeWidth={1.75} />
//         </button>

//         <button
//           onClick={handleNext}
//           className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-red-600"
//         >
//           <ChevronRight size={32} strokeWidth={1.75} />
//         </button>
//       </div>

//       {/* Pagination Circles */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`h-3 rounded-full transition-all ${
//               currentIndex === index ? "w-8 bg-red-600" : "w-3 bg-white/60"
//             }`}
//           />
//         ))}
//       </div>
//     </Carousel>
//   );
// }
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

      {/* الأسهم بتاعتك */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 rounded-full bg-white/80 p-2">
        <button
          onClick={() => api?.scrollPrev()}
          className="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-red-600"
        >
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
