'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IoArrowForward } from 'react-icons/io5';

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 8000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: any[];
}) {
  const [curr, setCurr] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endPos = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const distance = startPosRef.current - endPos;

    if (distance > 50) next();
    if (distance < -50) prev();
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const movePos = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = startPosRef.current - movePos;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${curr * 100}% - ${distance}px)`;
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
        ref={containerRef}
      >
        {slides.map((serie, index) => (
          <div className="flex-shrink-0 w-full sm:h-[400px] relative" key={index}>
            <Image
              src={`/images/series/${serie.id}/posterImage`}
              width={640}
              height={960}
              alt={serie.title + ' CoverImage'}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center px-10">
              <div className="max-w-screen-xl flex flex-col sm:flex-row items-center sm:items-start bg-opacity-70 p-5 rounded-md">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={`/images/series/${serie.id}/posterImage`}
                    width={300}
                    height={300}
                    alt={serie.title}
                    className="object-cover w-45 rounded-md"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center text-white">
                  <h1 className="text-3xl font-bold line-clamp-1">{serie.title}</h1>
                  <div className="flex-wrap hidden sm:block md:flex my-3">
                    {serie.genres?.map((item: any, index: any) => (
                      <a
                        key={index}
                        className="btn mr-5 mt-2"
                        href={'/genres/' + item.name}
                        rel="tag"
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                  <p className="line-clamp-2">{serie.synopsis}</p>
                  <a
                    href={`/series/${serie.id}/${serie.slug}`}
                    className="btn btn-primary rounded-lg w-[10em] my-3 p-2 flex items-center justify-center text-sm font-semibold"
                  >
                    Ler Agora <IoArrowForward className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-0 right-0 bottom-4">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurr(i)}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${curr === i ? "p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
