import React from 'react';
import { FolderIcon, BoxIcon } from 'lucide-react';
export interface AppIconProps {
  name: string;
  icon?: BoxIcon;
  emoji?: string;
  image?: string; // PNG image path
  onClick?: () => void;
}
export function AppIcon({
  name,
  icon: Icon,
  emoji,
  image,
  onClick
}: AppIconProps) {
  return <button onClick={onClick} className="group flex flex-col items-center gap-2 p-3 rounded-cloud-lg hover:bg-white/30 dark:hover:bg-dark-bg-light/30 transition-all duration-200">
      <div className="w-16 h-16 rounded-cloud-lg bg-white/60 dark:bg-dark-bg-light/60 backdrop-blur-sm shadow-cloud flex items-center justify-center group-hover:scale-110 transition-transform duration-200 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : emoji ? (
          <span className="text-3xl">{emoji}</span>
        ) : Icon ? (
          <Icon size={32} className="text-cloud-gray-deeper dark:text-dark-text" />
        ) : (
          <FolderIcon size={32} className="text-cloud-gray-deeper dark:text-dark-text" />
        )}
      </div>
      <span className="text-sm font-medium text-white dark:text-dark-text drop-shadow-lg">
        {name}
      </span>
    </button>;
}