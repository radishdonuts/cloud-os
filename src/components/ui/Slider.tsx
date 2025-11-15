export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true
}: SliderProps) {
  const percentage = (value - min) / (max - min) * 100;
  return <div className="w-full">
      {label && <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
            {label}
          </label>
          {showValue && <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
              {value}
            </span>}
        </div>}
      <div className="relative">
        <div className="h-2 bg-cloud-gray dark:bg-dark-bg-lighter rounded-full">
          <div className="h-full bg-gradient-to-r from-cloud-green to-cloud-green-dark rounded-full transition-all duration-200" style={{
          width: `${percentage}%`
        }} />
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer" />
        <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-dark-text rounded-full shadow-cloud border-2 border-cloud-green pointer-events-none transition-all duration-200" style={{
        left: `calc(${percentage}% - 10px)`
      }} />
      </div>
    </div>;
}