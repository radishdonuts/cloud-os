import React from 'react';
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}
export function Card({
  children,
  className = '',
  hover = false,
  onClick
}: CardProps) {
  return <div className={`
        bg-white/80 dark:bg-dark-bg-light/80 
        backdrop-blur-cloud 
        rounded-cloud-lg 
        shadow-cloud 
        border border-cloud-gray/20 dark:border-dark-border
        ${hover ? 'hover:shadow-cloud-hover hover:scale-[1.02] transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `} onClick={onClick}>
      {children}
    </div>;
}