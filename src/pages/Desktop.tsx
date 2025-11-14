import React, { useState } from 'react';
import { Dock } from '../components/desktop/Dock';
import { SystemTray } from '../components/desktop/SystemTray';
import { AppIcon } from '../components/desktop/AppIcon';
import { CloudIcon } from '../components/ui/CloudIcon';
import { FolderIcon, FileTextIcon, ImageIcon } from 'lucide-react';
export interface DesktopProps {
  onAppOpen: (app: string) => void;
  onQuickSettingsOpen: () => void;
  onNotificationsOpen: () => void;
  trashCount?: number;
}
export function Desktop({
  onAppOpen,
  onQuickSettingsOpen,
  onNotificationsOpen,
  trashCount = 0
}: DesktopProps) {
  const desktopApps = [{
    name: 'Documents',
    icon: FolderIcon,
    action: () => onAppOpen('files-documents')
  }, {
    name: 'Projects',
    icon: FolderIcon,
    action: () => onAppOpen('files-desktop')
  }, {
    name: 'Photos',
    icon: ImageIcon,
    action: () => onAppOpen('photos')
  }, {
    name: 'Notes',
    emoji: '📝',
    action: () => onAppOpen('notes')
  }];
  return <div className="w-full min-h-screen bg-gradient-to-br from-cloud-green via-cloud-blue/30 to-cloud-purple/20 relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => <div key={i} className="absolute opacity-10" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${12 + Math.random() * 8}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`
      }}>
            <CloudIcon size={60 + Math.random() * 100} />
          </div>)}
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 p-8 grid grid-cols-8 gap-4 content-start">
        {desktopApps.map((app, i) => <AppIcon key={i} name={app.name} icon={app.icon} emoji={app.emoji} onClick={app.action} />)}
      </div>

      {/* System Tray */}
      <SystemTray onQuickSettingsClick={onQuickSettingsOpen} onNotificationsClick={onNotificationsOpen} notificationCount={3} />

      {/* Dock */}
      <Dock onAppClick={onAppOpen} trashCount={trashCount} />
    </div>;
}