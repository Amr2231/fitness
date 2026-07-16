import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type Props = {
  className?: string;
};

export default function LanguageSwitcher({ className }: Props) {
  const { locale } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocale = (locale as "en" | "ar") || "en";

  const switchLocale = (target: "en" | "ar") => {
    if (target === currentLocale) return;

    // Replace only the leading /:locale segment, keep the rest of the path + query/hash
    const segments = location.pathname.split("/");
    segments[1] = target;
    const newPath = segments.join("/") || `/${target}`;

    navigate(`${newPath}${location.search}${location.hash}`);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-primary/40 bg-main/10 py-1 ps-2.5 pe-1 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      <Globe className="h-4 w-4 shrink-0 text-primary" />

      {/* Toggle track */}
      <div className="relative flex items-center rounded-full bg-black/10 dark:bg-white/10">
        {/* Sliding highlight */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 w-9 rounded-full bg-primary transition-transform duration-300 ease-out",
            "ltr:left-0 rtl:right-0",
            currentLocale === "ar" && "ltr:translate-x-9 rtl:-translate-x-9",
          )}
        />

        <button
          type="button"
          onClick={() => switchLocale("en")}
          aria-pressed={currentLocale === "en"}
          className={cn(
            "relative z-10 w-9 rounded-full py-1 text-xs font-bold transition-colors cursor-pointer",
            currentLocale === "en" ? "text-white" : "text-foreground/60 hover:text-foreground",
          )}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => switchLocale("ar")}
          aria-pressed={currentLocale === "ar"}
          className={cn(
            "relative z-10 w-9 rounded-full py-1 text-xs font-bold transition-colors cursor-pointer",
            currentLocale === "ar" ? "text-white" : "text-foreground/60 hover:text-foreground",
          )}
        >
          AR
        </button>
      </div>
    </div>
  );
}
