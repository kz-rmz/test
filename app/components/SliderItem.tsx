"use client";
import { forwardRef } from "react";
import { cn } from "../utils/cn";
type Props = {
  slide: {
    id: number;
    types: string;
    img: string;
    title: string;
    date: string;
  };
  className?: string;
  isActive?: boolean;
};

const SliderItem = forwardRef((props: Props, ref: any) => {
  return (
    <div ref={ref} className={props.className}>
      <img
        src={props.slide.img}
        alt={props.slide.title}
        className={cn(
          `block object-cover min-h-[240px] min-w-[320px]  lg:h-[344px] lg:min-w-[344px] ${props.className}`,
          {
            "min-h-[240px] min-w-[320px] lg:min-w-[688px]": props.slide.title?.length > 35,
          }
        )}
      />
      <p className={cn("text-lg md:text-[28px] text-[#525C7A] mt-8", { "text-emerald-500": props.isActive })}>
        {props.slide.title}
      </p>
      <p className='text-md md:text-lg text-[#A2ACC7]'>{props.slide.date}</p>
    </div>
  );
});

export default SliderItem;
