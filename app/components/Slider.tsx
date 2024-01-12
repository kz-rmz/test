"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import data from "@/mockData";
import { cn } from "../utils/cn";
import SliderItem from "./SliderItem";
import ArrowLeftLg from "@/app/assets/ArrowLeftLg.svg";
import ArrowRightLg from "@/app/assets/ArrowRightLg.svg";

function shuffleArray(array: any) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const shapes = [
  "rounded-tr-[230px] rounded-bl-[230px]",
  "rounded-tl-[230px] rounded-br-[230px]",
  "rounded-tl-[130px] rounded-br-[130px]",
  "rounded-full",
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const shuffledShapes = useRef(shuffleArray(shapes));
  const slidesRef = useRef<Map<any, any> | null>(null);

  function getMap() {
    if (!slidesRef.current) {
      slidesRef.current = new Map();
    }
    return slidesRef.current;
  }

  function scrollToNext() {
    const map = getMap();
    const isLastSlide = currentSlide === map.size;
    const newSlide = isLastSlide ? 1 : currentSlide + 1;
    setCurrentSlide(newSlide);
    const node = map.get(newSlide);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function scrollToPrev() {
    const map = getMap();
    const isFirstSlide = currentSlide === 1;
    const newSlide = isFirstSlide ? map.size : currentSlide - 1;
    setCurrentSlide(newSlide);
    const node = map.get(newSlide);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <div className='flex flex-col relative w-full'>
      <div className='mt-[57px] flex gap-3 overflow-x-auto scroll-smooth snap-x w-full'>
        {data?.map((slide, index) => {
          const shape = shuffledShapes.current[index % shapes.length];
          return (
            <SliderItem
              key={slide.id}
              isActive={currentSlide === slide.id}
              slide={slide}
              className={`snap-start ${shape}`}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(slide.id, node);
                } else {
                  map.delete(slide.id);
                }
              }}
            />
          );
        })}
      </div>
      <div className='flex justify-between bottom-0 w-full py-5'>
        <Image src={ArrowLeftLg} alt='left arrow' width={100} height={50} onClick={() => scrollToPrev()} />
        <Image
          src={ArrowRightLg}
          alt='right arrow'
          width={100}
          height={50}
          className={cn({ "color-gray-200": currentSlide === getMap().size })}
          onClick={() => scrollToNext()}
        />
      </div>
    </div>
  );
}
