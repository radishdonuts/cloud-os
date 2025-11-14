import React from 'react';
import { XIcon, MinusIcon, MaximizeIcon } from 'lucide-react';
export interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  width?: string;
  height?: string;
  maximized?: boolean;
}
export function Window({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  width = 'w-full',
  height = 'h-full',
  maximized = false
}: WindowProps) {
  return <div className={`
      ${maximized ? 'fixed inset-0 z-50 w-screen h-screen' : `${width} ${height}`}
      bg-white/90 dark:bg-dark-bg/90
      backdrop-blur-cloud
      rounded-cloud-xl
      shadow-cloud-lg
      border border-cloud-gray/20 dark:border-dark-border
      overflow-hidden
      flex flex-col
      ${maximized ? 'transition-all duration-300' : ''}
    `}>
      {/* Title Bar */}
      <div className="
        flex items-center justify-between 
        px-6 py-4 
        bg-white/50 dark:bg-dark-bg-light/50
        border-b border-cloud-gray/20 dark:border-dark-border
      ">
        <h2 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {onMinimize && <button onClick={onMinimize} className="
                w-8 h-8 rounded-full 
                bg-cloud-gray/30 dark:bg-dark-bg-lighter
                hover:bg-cloud-gray/50 dark:hover:bg-dark-bg-lighter
                flex items-center justify-center
                transition-all duration-200
              ">
              <MinusIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text" />
            </button>}
          {onMaximize && <button onClick={onMaximize} className="
                w-8 h-8 rounded-full 
                bg-cloud-gray/30 dark:bg-dark-bg-lighter
                hover:bg-cloud-gray/50 dark:hover:bg-dark-bg-lighter
                flex items-center justify-center
                transition-all duration-200
              ">
              <MaximizeIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text" />
            </button>}
          {onClose && <button onClick={onClose} className="
                w-8 h-8 rounded-full 
                bg-red-400/30 dark:bg-red-500/30
                hover:bg-red-400/50 dark:hover:bg-red-500/50
                flex items-center justify-center
                transition-all duration-200
              ">
              <XIcon size={16} className="text-red-600 dark:text-red-400" />
            </button>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>;
}