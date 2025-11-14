import React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return <div className="w-full">
      {label && <label className="block text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mb-2">
          {label}
        </label>}
      <input className={`
          w-full px-4 py-3 
          bg-white/60 dark:bg-dark-bg-lighter/60 
          backdrop-blur-sm
          border-2 border-cloud-gray/30 dark:border-dark-border
          rounded-cloud 
          text-cloud-gray-deeper dark:text-dark-text
          placeholder:text-cloud-gray-dark dark:placeholder:text-dark-text-muted
          focus:outline-none focus:border-cloud-green dark:focus:border-cloud-green
          focus:ring-4 focus:ring-cloud-green/20
          transition-all duration-200
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
          ${className}
        `} {...props} />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>;
}