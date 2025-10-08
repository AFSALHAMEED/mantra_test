import React, { useEffect, useRef, useState } from "react";
import resort1 from "../assets/resort1.jpg";
import resort2 from "../assets/resort2.webp";
import resort3 from "../assets/resort3j.jpg";

export const Gallery = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const images: string[] = [resort1, resort2, resort3];
  const totalSlides = images.length;

  const goToSlide = (index: number) => {
    if (sliderRef.current && sliderRef.current.children.length > 0) {
      const slideWidth = (sliderRef.current.children[0] as HTMLElement)
        .clientWidth;
      sliderRef.current.style.transform = `translateX(-${
        index * slideWidth
      }px)`;
    }
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % totalSlides;
    setCurrentSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => goToSlide(currentSlide);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <div id="gallery" className="my-8 scroll-mt-20">
      <h1 className="text-3xl font-semibold text-center mx-auto">Gallery</h1>
      <p className="text-sm text-slate-500 text-center my-5 max-w-lg mx-auto">
        Experience the perfect blend of comfort, adventure, and relaxation
      </p>
      <div className="flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="md:p-2 p-1 bg-black/30 md:mr-6 mr-2 rounded-full hover:bg-black/50"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="w-full max-w-5xl overflow-hidden relative h-[400px]">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out h-[400px]"
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="p-1 md:p-2 bg-black/30 md:ml-6 ml-2 rounded-full hover:bg-black/50"
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
