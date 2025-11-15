import { WifiIcon, BellIcon, BluetoothIcon, Volume2Icon, BatteryIcon } from 'lucide-react';
export interface SystemTrayProps {
  onQuickSettingsClick: () => void;
  onNotificationsClick: () => void;
  notificationCount?: number;
  hasOpenWindows?: boolean;
}
export function SystemTray({
  onQuickSettingsClick,
  onNotificationsClick,
  notificationCount = 0,
  hasOpenWindows = false
}: SystemTrayProps) {
  // Collapse to compact form when windows are open
  return hasOpenWindows ? (
    <div
      className="fixed top-1/2 right-2 z-50 transform -translate-y-1/2 transition-all duration-300 group opacity-30 hover:opacity-100"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="bg-white/60 dark:bg-dark-bg-light/60 backdrop-blur-cloud rounded-full shadow-cloud-lg border border-cloud-gray/30 dark:border-dark-border flex flex-col items-center justify-center gap-2 p-2 w-12 h-12 group-hover:scale-110 group-hover:bg-white/90 group-hover:dark:bg-dark-bg-light/90"
        style={{ transition: 'all 0.2s' }}
      >
        <button onClick={onQuickSettingsClick} className="p-1 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-full transition-all duration-200">
          <WifiIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text" />
        </button>
        <button onClick={onNotificationsClick} className="relative p-1 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-full transition-all duration-200">
          <BellIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text" />
          {notificationCount > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />}
        </button>
      </div>
    </div>
  ) : (
    <div className="fixed top-6 right-6 z-50 animate-slide-down">
      <div className="bg-white/60 dark:bg-dark-bg-light/60 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/30 dark:border-dark-border px-4 py-2 flex items-center gap-3">
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
        <button onClick={onNotificationsClick} className="relative p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-all duration-200">
          <BellIcon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
          {notificationCount > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
        </button>
        <div className="w-px h-6 bg-cloud-gray/30 dark:bg-dark-border" />
        <div className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text min-w-[80px] text-center">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}