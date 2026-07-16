import { useTranslations } from "use-intl";

type SubSectionTitleProps = {
  assetSrc: string;
  subTitle: string;
};

export default function SubSectionTitle({
  assetSrc,
  subTitle,
}: SubSectionTitleProps) {
  // translations
  const t = useTranslations();

  return (
    <div>
      <div className="text-xl md:text-3xl lg:text-[40px] font-bold relative font-baloo text-main dark:text-zinc-100">
        <img
          src={assetSrc}
          alt="Our story"
          width={291}
          height={77}
          loading="lazy"
          className="absolute z-0 top-1/2 -translate-y-1/2 hidden lg:block"
        />
        {t.rich(subTitle, {
          span: (chunks) => <span className="text-primary">{chunks}</span>,
        })}
      </div>
    </div>
  );
}
