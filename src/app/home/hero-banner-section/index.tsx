import { useTranslations } from "use-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollingTicker from "@/components/shared/scrolling-ticker";
import arrow from "@/assets/images/arrow.png";
import imgBanner from "@/assets/images/Theo Vance.png";
import { useAuthStatus } from "@/lib/hooks/use-auth-status";

export default function HeroBanner() {
  const t = useTranslations("Hero-banner");
  const navigate = useNavigate();
  const { locale } = useParams();
  const isAuthenticated = useAuthStatus();

  const handleGetStarted = () => {
    navigate(`/${locale}/${isAuthenticated ? "classes" : "register"}`);
  };

  const handleExploreMore = () => {
    navigate(`/${locale}/classes`);
  };

  return (
    <div className="overflow-hidden bg-linear-to-br from-white/10 via-[#abb1af] to-[#abb1af] dark:from-[#242424]/90 dark:via-[#242424]/80 dark:to-[#242424]/60 ">
      <div className="content mx-auto flex w-full max-w-360 flex-col justify-between gap-10 px-4 pt-10 sm:px-6 md:pt-14 lg:flex-row lg:items-start lg:px-20 lg:pt-0">
        <div className="pt-4 lg:pt-30 lg:max-w-2xl">
          <p className="mb-6 text-3xl leading-[1.15] font-bold uppercase text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl lg:text-5xl">
            {t("your body can")}
            <span className="text-orange-600"> {t("stand")} </span>
            <br className="hidden lg:block" />
            <span className="text-orange-600">{t("almost")}</span>
            <br className="block lg:hidden" />
            {t("anything")}
          </p>

          <p className="border-s-4 border-orange-600 pt-1.5 ps-4 text-base leading-7 font-normal text-zinc-900 dark:text-zinc-100 sm:ps-5 sm:text-lg">
            {t("first-line")} <br /> {t("second-line")} <br />
            {t("third-line")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:w-152 lg:grid-cols-3 lg:gap-4">
            <div>
              <span className="mb-1.5 block text-3xl leading-7 font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                {t("num-members")}
              </span>
              <p className="text-base leading-7 font-normal capitalize text-zinc-900 dark:text-zinc-100 sm:text-lg">
                {t("active-members")}
              </p>
            </div>

            <div>
              <span className="mb-1.5 block text-3xl leading-7 font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                {t("num-trainers")}
              </span>
              <p className="text-base leading-7 font-normal capitalize text-zinc-900 dark:text-zinc-100 sm:text-lg">
                {t("certified-trainers")}
              </p>
            </div>

            <div>
              <span className="mb-1.5 block text-3xl leading-7 font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                {t("num-years")}
              </span>
              <p className="text-base leading-7 font-normal capitalize text-zinc-900 dark:text-zinc-100 sm:text-lg">
                {t("year-of-experience")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start gap-4  sm:flex-row sm:flex-wrap sm:items-center sm:justify-start rtl:sm:justify-end sm:gap-6 lg:mt-16 lg:gap-10">
            <div
              onClick={handleGetStarted}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
              className="flex cursor-pointer flex-row px-0 ltr:flex-row rtl:flex-row-reverse sm:px-2 lg:px-5"
            >
              <Button
                type="button"
                variant="default"
                onClick={handleGetStarted}
              >
                {t("get-started")}
              </Button>
              <img
                src={arrow}
                alt="img-button"
                className="-ms-2 h-9 w-9 rounded-full border-2 border-white bg-orange-600"
              />
            </div>

            <div
              onClick={handleExploreMore}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleExploreMore()}
              className="flex cursor-pointer flex-row ltr:flex-row rtl:flex-row-reverse"
            >
              <Button
                type="button"
                variant="default"
                onClick={handleExploreMore}
                className="border border-orange-600 bg-transparent text-orange-600 hover:text-white "
              >
                {t("explore-more")}
              </Button>
              <img
                src={arrow}
                alt="img-button"
                className="-ms-2 h-9 w-9 rounded-full border-2 border-white bg-orange-600"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full justify-center lg:mx-0 lg:w-auto lg:justify-end">
          <img
            src={imgBanner}
            alt="logo-banner"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <ScrollingTicker />
    </div>
  );
}
