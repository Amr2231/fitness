import arrowIcon from "@/assets/images/about-arrow.png";

type InfoSectionProps = {
  title: string;
  description: string;
};

export default function InfoSection({ title, description }: InfoSectionProps) {
  return (
    <div className="space-y-4 text-main dark:text-zinc-100">
      <div className="flex items-center gap-3 ">
        <img src={arrowIcon} alt="arrow" loading="lazy" />
        <h6>{title}</h6>
      </div>
      <p className="max-w-72">{description}</p>
    </div>
  );
}
