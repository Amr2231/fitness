import logo from "@/assets/images/fit 1.png";
import ScrollingTicker from "@/components/shared/scrolling-ticker";
import { Phone, Mail } from "lucide-react";
import { useTranslations } from "use-intl";
export default function Footer() {
  // Translations
  const t = useTranslations("Footer");
  return (
    <>
      <ScrollingTicker />
      {/* dispaly footer */}
      <div className="block lg:flex justify-between items-start py-10 px-4 lg:px-20 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        {/* logo */}
        <div className="mb-4 ">
          <img src={logo} alt="logo" className="mb-2" />
          <p className="leading-6 mb-2  font-normal text-lg text-zinc-900 dark:text-zinc-100">
            {t("first-line")}
          </p>
          <p className="leading-6 font-normal text-lg text-zinc-900 dark:text-zinc-100">
            {t("second-line")}
          </p>
        </div>

        {/* contact */}
        <div className="mb-4">
          <h3 className="capitalize text-lg font-bold leading-7 mb-6  dark:text-zinc-100">
            {t("contact-us")}
          </h3>
          {/* phone */}
          <div className="flex items-center  mb-2">
            <div className="me-4 w-10 h-10 rounded-full border border-zinc-900 dark:border-zinc-600 dark:text-zinc-100 flex items-center justify-center">
              <Phone size={18} />
            </div>
            <div className="text-xl leading-7 text-zinc-900 dark:text-zinc-100 font-normal">
              +91 123 456 789
            </div>
          </div>

          {/* mail */}
          <div className="flex items-center ">
            <div className="me-4 w-10 h-10 rounded-full border border-zinc-900 dark:border-zinc-600 dark:text-zinc-100 flex items-center justify-center">
              <Mail size={18} />
            </div>
            <div className="text-xl leading-7 text-zinc-900 dark:text-zinc-100 font-normal">
              info@gmail.com
            </div>
          </div>
        </div>

        {/* timing */}
        <div className="mb-4">
          <h3 className="capitalize text-lg font-bold leading-7 mb-6 text-zinc-900 dark:text-zinc-100">
            {t("timing")}
          </h3>
          <p className="leading-6 font-normal text-lg text-zinc-900 dark:text-zinc-100 mb-2">
            {t("start-time")}
          </p>
          <p className="leading-6 font-normal text-lg text-zinc-900 dark:text-zinc-100">
            {t("special-time")}
          </p>
        </div>

        {/* location */}
        <div>
          <h3 className="capitalize text-lg font-bold leading-7 mb-6 text-zinc-900 dark:text-zinc-100">
            {t("location")}
          </h3>
          <p className="leading-6 font-normal text-lg text-zinc-900 dark:text-zinc-100">
            2715 Ash Dr. San Jose, South Dakota 83475
          </p>
        </div>
      </div>
    </>
  );
}
