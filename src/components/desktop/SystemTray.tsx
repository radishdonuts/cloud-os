import React, { useEffect, useState } from 'react';
import { WifiIcon, BluetoothIcon, BatteryIcon, Volume2Icon, BellIcon, SunIcon, MoonIcon } from 'lucide-react';
export interface SystemTrayProps {
  onQuickSettingsClick: () => void;
  onNotificationsClick: () => void;
  notificationCount?: number;
}
export function SystemTray({
  onQuickSettingsClick,
  onNotificationsClick,
  notificationCount = 0
}: SystemTrayProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className="fixed top-6 right-6 z-50 animate-slide-down">
      <div className="bg-white/60 dark:bg-dark-bg-light/60 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/30 dark:border-dark-border px-4 py-2 flex items-center gap-3">
        {/* Quick Settings Icons */}
        <button onClick={onQuickSettingsClick} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <WifiIcon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
        </button>

        <button onClick={onQuickSettingsClick} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <BluetoothIcon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
        </button>

        <button onClick={onQuickSettingsClick} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <Volume2Icon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
        </button>

        <button onClick={onQuickSettingsClick} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <BatteryIcon size={18} className="text-cloud-green" />
        </button>

        <div className="w-px h-6 bg-cloud-gray/30 dark:bg-dark-border" />

        {/* Notifications */}
        <button onClick={onNotificationsClick} className="relative p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <BellIcon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
          {notificationCount > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
        </button>

        <div className="w-px h-6 bg-cloud-gray/30 dark:bg-dark-border" />

        {/* Time */}
        <div className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text min-w-[80px] text-center">
          {time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })}
        </div>
      </div>
    </div>;
}