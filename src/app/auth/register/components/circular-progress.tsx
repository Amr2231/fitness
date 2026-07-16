type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function CircularProgress({ currentStep, totalSteps }: Props) {
  const size = 60;
  const strokeWidth = 3;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = currentStep / totalSteps;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          className="stroke-black/20 dark:stroke-white/20"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          className="text-primary transition-all duration-300"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-black dark:text-white">
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
}
