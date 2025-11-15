export interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
}
export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#A8D5BA',
  showLabel = true
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress / 100 * circumference;
  return <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-cloud-gray dark:text-dark-bg-lighter" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      {showLabel && <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-cloud-gray-deeper dark:text-dark-text">
            {Math.round(progress)}%
          </span>
        </div>}
    </div>;
}