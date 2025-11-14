import React from 'react';
import { XIcon } from 'lucide-react';
export interface NotificationProps {
  title: string;
  message: string;
  time: string;
  icon?: string;
  onDismiss?: () => void;
}
export function Notification({
  title,
  message,
  time,
  icon,
  onDismiss
}: NotificationProps) {
  return <div className="bg-white/80 dark:bg-dark-bg-light/80 backdrop-blur-cloud rounded-cloud-lg shadow-cloud border border-cloud-gray/20 dark:border-dark-border p-4 animate-slide-left">
      <div className="flex items-start gap-3">
        {icon && <div className="w-10 h-10 rounded-cloud bg-cloud-green/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">{icon}</span>
          </div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
              {title}
            </h4>
            <button onClick={onDismiss} className="p-1 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-colors">
              <XIcon size={14} className="text-cloud-gray-dark dark:text-dark-text-muted" />
            </button>
          </div>
          <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mb-1">
            {message}
          </p>
          <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
            {time}
          </p>
        </div>
      </div>
    </div>;
}