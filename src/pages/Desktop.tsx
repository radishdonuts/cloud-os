import React from 'react';
import { CloudDriveIsland } from '../components/desktop/CloudDriveIsland';
import { Dock } from '../components/desktop/Dock';
import { SystemTray } from '../components/desktop/SystemTray';
import { AppIcon } from '../components/desktop/AppIcon';
import { CloudIcon } from '../components/ui/CloudIcon';
import { FolderIcon, FileTextIcon, ImageIcon, GamepadIcon } from 'lucide-react';
import { User } from '../App';

export interface DesktopProps {
  currentUser: User;
  onAppOpen: (app: string) => void;
  onQuickSettingsOpen: () => void;
  onNotificationsOpen: () => void;
  trashCount?: number;
  cloudFileCount?: number;
  cloudSyncStatus?: 'idle' | 'syncing' | 'synced';
  maximizedApp?: string | null;
}
export function Desktop({
  currentUser,
  onAppOpen,
  onQuickSettingsOpen,
  onNotificationsOpen,
  trashCount = 0,
  cloudFileCount = 0,
  cloudSyncStatus = 'idle',
  maximizedApp = null
}: DesktopProps) {
  // Generate desktop apps based on user data
  const desktopApps = currentUser.desktopApps.map(app => {
    let icon: React.ComponentType<{ size?: string | number; className?: string }> = FolderIcon;
    let action = () => onAppOpen('files-documents');
    let emoji: string | undefined;
    let image: string | undefined = app.image;

    if (app.icon === 'folder') {
      icon = FolderIcon;
      if (app.name.toLowerCase().includes('document')) {
        action = () => onAppOpen('files-documents');
      } else if (app.name.toLowerCase().includes('project') || app.name.toLowerCase().includes('desktop')) {
        action = () => onAppOpen('files-desktop');
      } else {
        action = () => onAppOpen('files');
      }
    } else if (app.icon === 'image') {
      icon = ImageIcon;
      action = () => onAppOpen('photos');
    } else if (app.icon === 'note') {
      icon = FileTextIcon;
      action = () => onAppOpen('notes');
    } else if (app.icon === 'game') {
      icon = GamepadIcon;
      action = () => onAppOpen('game-mode');
    }

    if (app.name.toLowerCase().includes('note')) {
      emoji = '📝';
    }

    return {
      name: app.name,
      icon: emoji || image ? FolderIcon : icon,
      emoji: emoji,
      image: image,
      action
    };
  });
  return <div className={`w-full min-h-screen ${currentUser.wallpaper.image ? '' : `bg-gradient-to-br ${currentUser.wallpaper.gradient}`} relative overflow-hidden transition-all duration-500`}>
      {/* Background Image */}
      {currentUser.wallpaper.image && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${currentUser.wallpaper.image}')` }}
        />
      )}
      
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => <div key={i} className={`absolute ${currentUser.wallpaper.image ? 'opacity-5' : 'opacity-10'}`} style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${12 + Math.random() * 8}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`
      }}>
            <CloudIcon size={60 + Math.random() * 100} />
          </div>)}
      </div>

      {/* Cloud Drive Island */}
      <CloudDriveIsland
        onOpenManager={() => onAppOpen('cloud-drive')}
        fileCount={cloudFileCount}
        syncStatus={cloudSyncStatus}
      />

      {/* Desktop Icons */}
      <div className="relative z-10 p-8 grid grid-cols-8 gap-4 content-start">
        {desktopApps.map((app, i) => <AppIcon key={i} name={app.name} icon={app.icon} emoji={app.emoji} image={app.image} onClick={app.action} />)}
      </div>

      {/* System Tray */}
      <SystemTray onQuickSettingsClick={onQuickSettingsOpen} onNotificationsClick={onNotificationsOpen} notificationCount={3} maximizedApp={maximizedApp} />

      {/* Dock */}
      <Dock onAppClick={onAppOpen} trashCount={trashCount} />
    </div>;
}