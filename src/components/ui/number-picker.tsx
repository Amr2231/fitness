import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import { cn } from "@/lib/utils/tailwind-merge";

interface NumberPickerProps {
  min: number;
  max: number;
  defaultValue: number;
  unit: "CM" | "KG" | "Years Old";
  onChange: (value: number) => void;
  className?: string;
  name?: string;
}

const NumberPicker = forwardRef<HTMLInputElement, NumberPickerProps>(
  ({ min, max, defaultValue, unit, onChange, name, className }, ref) => {
    const numbers = useMemo(() => {
      return Array.from({ length: max - min + 1 }, (_, i) => min + i);
    }, [min, max]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeValue, setActiveValue] = useState(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const ITEM_WIDTH = 66;

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const requestRef = useRef<number>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleScroll = () => {
      if (!scrollRef.current) return;
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(currentScrollLeft / ITEM_WIDTH);

      const newValue = numbers[index];
      if (newValue !== undefined && newValue !== activeValue) {
        setActiveValue(newValue);
        onChange?.(newValue);

        if (inputRef.current) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;
          nativeInputValueSetter?.call(inputRef.current, newValue);
          inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };

    useEffect(() => {
      if (scrollRef.current) {
        const targetIndex = numbers.indexOf(defaultValue);
        scrollRef.current.scrollLeft = targetIndex * ITEM_WIDTH;
      }
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }, [defaultValue, numbers]);

    const applyMomentum = () => {
      if (!scrollRef.current || Math.abs(velocity.current) < 0.5) return;
      scrollRef.current.scrollLeft -= velocity.current;
      velocity.current *= 0.95;
      requestRef.current = requestAnimationFrame(applyMomentum);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (!scrollRef.current) return;
      isDragging.current = true;
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
      velocity.current = 0;
      lastTime.current = performance.now();
      lastX.current = e.pageX;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      e.preventDefault();
      const currentTime = performance.now();
      const currentX = e.pageX;
      const deltaTime = currentTime - lastTime.current;
      const deltaX = currentX - lastX.current;
      if (deltaTime > 0) velocity.current = (deltaX / deltaTime) * 20;
      lastTime.current = currentTime;
      lastX.current = currentX;

      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      requestRef.current = requestAnimationFrame(applyMomentum);
    };

    const getItemStyles = (num: number) => {
      const diff = Math.abs(num - activeValue);
      // Using dynamic color that adapts to Light/Dark themes
      const baseColor = "text-neutral-900 dark:text-white";

      if (diff === 0) return "text-primary scale-125 opacity-100";
      if (diff === 1) return `${baseColor} scale-100 opacity-60`;
      if (diff === 2) return `${baseColor} scale-75 opacity-30`;
      return `${baseColor} scale-50 opacity-10`;
    };

    return (
      <div
        dir="ltr"
        className={cn(
          "flex flex-col items-center gap-2 w-105.5 mx-auto",
          className,
        )}
      >
        <input
          type="hidden"
          name={name}
          ref={inputRef}
          value={activeValue}
          readOnly
        />
        <span className="text-primary tracking-widest font-bold">{unit}</span>

        <div className="relative flex w-full items-center">
          {/* Edge Gradients - Already using 'from-background' which works automatically */}
          <div className="absolute inset-y-0 left-0 z-10 w-20 pointer-events-none bg-linear-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-20 pointer-events-none bg-linear-to-l from-background to-transparent" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={() => {
              isDragging.current = false;
            }}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "flex w-full overflow-x-auto snap-x snap-mandatory py-2 touch-pan-x select-none",
              "gap-0.5",
              "px-[calc(50%-33px)] cursor-grab active:cursor-grabbing",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            )}
          >
            {numbers.map((num) => (
              <div
                key={num}
                className="flex-none w-16 snap-center flex justify-center items-center transition-all duration-300"
              >
                <span
                  className={cn(
                    "text-3xl font-bold transition-all duration-300",
                    getItemStyles(num),
                  )}
                >
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-10 border-b-primary mt-1 transition-transform" />
      </div>
    );
  },
);

NumberPicker.displayName = "NumberPicker";
export { NumberPicker };
