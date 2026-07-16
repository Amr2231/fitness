import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/navbar/theme-toggle";
import logo from "../../../assets/images/fit 1.png";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar({ account }: { account?: boolean }) {
  // Router
  const navigate = useNavigate();
  const { locale } = useParams();
  const location = useLocation();

  // state to track active link
  const [active, setActive] = useState(location.pathname);

  // Translations
  const t = useTranslations("Navbar");

  // links data
  const links = [
    { name: t("home"), path: `/${locale}` },
    { name: t("about"), path: `/${locale}/about` },
    { name: t("classes"), path: `/${locale}/classes` },
    { name: t("healthy"), path: `/${locale}/healthy` },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setActive(path);
  };

  return (
    <nav
      className={`${account ? "bg-transparent" : " bg-background"} fixed overflow-x-hidden py-4 px-8 top-0 left-0 right-0 z-50 w-full`}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/*  Logo */}
        <img
          src={logo}
          alt="Logo"
          className="cursor-pointer w-16 sm:w-20 h-auto shrink-0"
          onClick={() => handleNavigate(`/${locale}`)}
        />

        {/*  (Desktop only) */}
        <div className="hidden lg:flex items-center justify-between flex-1 mx-10">
          {/*  Links */}
          <div className="flex justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink
                      onClick={() => handleNavigate(link.path)}
                      className={`px-4 py-2 text-xl font-bold capitalize cursor-pointer transition ${
                        active === link.path
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-zinc-900 dark:text-zinc-100 hover:text-orange-600"
                      }`}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/*  Buttons */}
          <div className="flex items-center gap-6">
            <Button onClick={() => navigate(`/${locale}/login`)}>
              {t("login")}
            </Button>

            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              onClick={() => navigate(`/${locale}/register`)}
            >
              {t("sign up")}
            </Button>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile  */}
        <div className="lg:hidden shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-orange-600 rounded-full p-2 flex items-center justify-center">
                <Menu size={24} className="sm:w-7 sm:h-7" />
              </button>
            </SheetTrigger>

            <SheetContent
              side={locale === "ar" ? "left" : "right"}
              className="w-[80vw] sm:w-[70vw] md:w-[60vw] p-4 sm:p-6 flex flex-col max-w-xs"
            >
              {/* Links */}
              <div className="flex flex-col gap-3 mt-6">
                {links.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavigate(link.path)}
                    className={`text-base sm:text-lg font-semibold text-left capitalize wrap-break-word ${
                      active === link.path
                        ? "text-orange-600"
                        : "text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-6 w-full">
                <Button
                  onClick={() => navigate(`/${locale}/login`)}
                  className="w-full text-sm sm:text-base"
                >
                  {t("login")}
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-orange-600 text-orange-600 text-sm sm:text-base"
                  onClick={() => navigate(`/${locale}/register`)}
                >
                  {t("sign up")}
                </Button>
              </div>

              <div className="mt-auto">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
