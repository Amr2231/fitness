type StepHeaderProps = {
  header: string;
  paragraph: string;
};

export default function StepsHeader({ header, paragraph }: StepHeaderProps) {
  return (
    <div className="mb-4">
      <h3 className="uppercase text-3xl font-extrabold text-black dark:text-white mx-auto mb-2">
        {header}
      </h3>
      <p className="text-base font-light mb-0 text-black/70 dark:text-white/90">
        {paragraph}
      </p>
    </div>
  );
}
