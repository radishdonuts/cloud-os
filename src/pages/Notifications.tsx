import React, { useState } from 'react';
import { Notification } from '../components/desktop/Notification';
import { Button } from '../components/ui/Button';
import { XIcon } from 'lucide-react';
export interface NotificationsProps {
  onClose: () => void;
}
interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  icon: string;
}
export function Notifications({
  onClose
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([{
    id: 1,
    title: 'System Update Available',
    message: 'CloudOS 2.1.0 is ready to install',
    time: '5 minutes ago',
    icon: '☁️'
  }, {
    id: 2,
    title: 'File Sync Complete',
    message: 'All files synced to cloud storage',
    time: '1 hour ago',
    icon: '✅'
  }, {
    id: 3,
    title: 'New Message',
    message: 'You have 3 unread messages',
    time: '2 hours ago',
    icon: '💬'
  }]);
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  const handleClearAll = () => {
    setNotifications([]);
  };
  return <div className="fixed inset-0 z-50 flex items-start justify-end p-6 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="w-96 bg-white/80 dark:bg-dark-bg-light/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/20 dark:border-dark-border p-6 max-h-[80vh] flex flex-col animate-slide-left" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-cloud-gray-deeper dark:text-dark-text">
            Notifications
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-colors">
            <XIcon size={20} className="text-cloud-gray-deeper dark:text-dark-text" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-auto space-y-3 mb-4">
          {notifications.length === 0 ? <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4 opacity-50">🔔</div>
              <p className="text-lg font-medium text-cloud-gray-deeper dark:text-dark-text mb-2">
                No notifications
              </p>
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                You're all caught up!
              </p>
            </div> : notifications.map(notif => <Notification key={notif.id} title={notif.title} message={notif.message} time={notif.time} icon={notif.icon} onDismiss={() => handleDismiss(notif.id)} />)}
        </div>

        {/* Footer */}
        {notifications.length > 0 && <Button variant="ghost" className="w-full" onClick={handleClearAll}>
            Clear All
          </Button>}
      </div>
    </div>;
}