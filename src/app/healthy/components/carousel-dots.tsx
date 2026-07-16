import { useEffect, useState } from "react";

type Props = {
  api: any;
  count: number;
};

export default function CarouselDots({ api, count }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
            activeIndex === index
              ? "bg-orange-600 w-4"
              : "bg-gray-300 dark:bg-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}
