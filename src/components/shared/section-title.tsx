import DumbbellIcon from "@/assets/images/Dumbbell.png";

type SectionTitleProps = {
  title: string;
  background: string;
};

export default function SectionTitle({ title, background }: SectionTitleProps) {
  return (
    <div className="relative w-fit">
      {/* Background Text */}
      <h2 className="text-6xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] overflow-hidden mask-[linear-gradient(to_top,transparent,black_90%)] mask-size-[100%_100%] select-none pointer-events-none whitespace-nowrap">
        {background}
      </h2>

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        <img src={DumbbellIcon} alt="icon" width={30} height={30} />
        <span className="text-primary font-semibold text-lg whitespace-nowrap">
          {title}
        </span>
      </div>
    </div>
  );
}
