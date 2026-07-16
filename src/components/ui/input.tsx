import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {icon && (
        <div
          className={cn(
            "absolute inset-s-4 flex items-center pointer-events-none text-foreground/70",
          )}
        >
          {/* icon */}
          {icon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-12 w-full min-w-0 py-2 rounded-3xl border border-input bg-transparent text-base text-foreground border-foreground/80 transition-colors outline-none",
          "placeholder:text-muted-foreground focus:border-foreground/90 disabled:pointer-events-none disabled:cursor-not-allowed",
          "md:text-sm dark:bg-input/30",
          icon ? "pl-12 pr-4 rtl:pr-12 rtl:pl-4" : "px-4",
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
