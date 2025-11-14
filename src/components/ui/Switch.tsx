import React from 'react';
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
export function Switch({
  checked,
  onChange,
  label,
  disabled = false
}: SwitchProps) {
  return <label className="flex items-center gap-3 cursor-pointer">
      <div className={`
          relative w-14 h-8 rounded-full transition-all duration-200
          ${checked ? 'bg-cloud-green shadow-glow' : 'bg-cloud-gray dark:bg-dark-bg-lighter'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `} onClick={() => !disabled && onChange(!checked)}>
        <div className={`
            absolute top-1 left-1 w-6 h-6 
            bg-white rounded-full shadow-cloud
            transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-0'}
          `} />
      </div>
      {label && <span className="text-cloud-gray-deeper dark:text-dark-text font-medium">
          {label}
        </span>}
    </label>;
}