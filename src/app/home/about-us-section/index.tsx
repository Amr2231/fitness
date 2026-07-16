import { useTranslations } from "use-intl";
import ImagesShow from "./images-show";
import InfoSection from "./info-section";
import { Button } from "@/components/ui/button";
import arrow from "@/assets/images/arrow.png";
import ourStoryAsset from "@/assets/images/about_us.png";
import SectionTitle from "@/components/shared/section-title";
import SubSectionTitle from "@/components/shared/sub-section-title";

export default function AboutUs() {
  // translations
  const t = useTranslations("about");

  return (
    <section className="flex justify-center py-10 bg-white/95 dark:bg-main">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 p-4 lg:p-0">
        <div className="order-2 lg:order-1">
          <ImagesShow />
        </div>
        <div className="order-1 lg:order-2 space-y-9 pt-4 ">
          {/* main title */}
          <SectionTitle title={t("title")} background={t("title-bg")} />
          {/* sub title */}
          <SubSectionTitle
            assetSrc={ourStoryAsset}
            subTitle={t("sub-title")}
          />
          {/* description */}
          <p className="text-base lg:text-lg w-full overflow-hidden text-main dark:text-zinc-100">
            {t("description")}{" "}
          </p>
          {/* info sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <InfoSection
              title={t("info-one-title")}
              description={t("info-one-description")}
            />
            <InfoSection
              title={t("info-two-title")}
              description={t("info-two-description")}
            />
          </div>
          <div className="w-full h-px bg-[#d9d8d7] dark:bg-[#434342]"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoSection
              title={t("info-three-title")}
              description={t("info-three-description")}
            />
            <InfoSection
              title={t("info-four-title")}
              description={t("info-four-description")}
            />
          </div>
          <div className="flex px-0">
            <Button variant="default">{t("get-started")}</Button>
            <img
              src={arrow}
              alt="img-button"
              className="-ms-2 size-8 rounded-full border-2 border-white bg-orange-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
