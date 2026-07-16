import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300
        ${isDark ? "bg-primary" : "bg-gray-800"}`}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md
        transform transition-transform duration-300

        /* rtl and ltr */
        ${isDark ? "ltr:translate-x-6 rtl:-translate-x-6" : "translate-x-0"}`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary" />
        ) : (
          <Sun className="w-4 h-4 text-gray-800" />
        )}
      </div>
    </button>
  );
}
