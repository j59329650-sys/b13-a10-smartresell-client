"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

const banners = [ 
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2070",     // Laptop
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2070", // Smartphone
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070", // Furniture
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2070", // Fashion
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070", // Electronics
  
];

export default function BannerSlider() {
  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mt-6 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%] h-[380px] sm:h-[450px] md:h-[520px]"
            >
              <Image
                src={banner}
                alt={`ReSell Hub Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center px-6 md:px-16">
                <div className="max-w-xl">
                  <div className="inline-block bg-primary/90 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                    Second Hand Marketplace
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                    {index === 0 && "Premium Used Laptops"}
                    {index === 1 && "Latest Smartphones"}
                    {index === 2 && "Quality Furniture"}
                    {index === 3 && "Fashion & Clothing"}
                    {index === 4 && "Electronics & Gadgets"}
                   
                  </h2>

                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Buy & Sell Smartly with <span className="text-emerald-300">SmartResell</span>
          </h1>
          <p className="text-emerald-100 md:text-lg max-w-xl mx-auto">
            Join thousands of buyers and sellers. Trade your unused items safely, quickly, and sustainably.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/signup" className="bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 transition-all transform hover:-translate-y-1">
              Get Started Free
            </Link>
            <Link href="/login" className="bg-emerald-700/50 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:bg-emerald-700/70 transition-all">
              Browse Marketplace
            </Link>
          </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl z-20 transition-all"
      >
        <ChevronLeft size={28} className="text-black" />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl z-20 transition-all"
      >
        <ChevronRight size={28} className="text-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "w-10 bg-primary"
                : "w-3 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}