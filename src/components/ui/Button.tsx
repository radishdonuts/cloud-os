import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-cloud font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-cloud-green hover:bg-cloud-green-dark text-white shadow-cloud hover:shadow-cloud-hover active:scale-95',
    secondary: 'bg-cloud-cream dark:bg-dark-bg-light hover:bg-cloud-cream-dark dark:hover:bg-dark-bg-lighter text-cloud-gray-deeper dark:text-dark-text shadow-cloud',
    ghost: 'bg-transparent hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-light text-cloud-gray-deeper dark:text-dark-text',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-cloud hover:shadow-cloud-hover active:scale-95'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>;
}