import { cn } from "@/lib/utils/tailwind-merge";
import { CircleX } from "lucide-react";

type FeedbackProps = React.HtmlHTMLAttributes<HTMLParagraphElement>;

export default function Feedback({
  className,
  children,
  ...props
}: FeedbackProps) {
  if (!children) return null;

  return (
    <p
      className={cn(
        "text-sm text-destructive py-2.5 text-center bg-primary w-80 relative rounded-2xl",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <CircleX className="size-4.5 bg-primary rounded-full absolute right-1/2 -top-2.5 translate-x-1/2" />
      {/* content */}
      {children}
    </p>
  );
}
