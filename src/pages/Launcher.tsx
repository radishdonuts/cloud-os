import React, { useState } from 'react';
import { CloudIcon } from '../components/ui/CloudIcon';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Window } from '../components/layout/Window';
import { FolderIcon, ImageIcon, SettingsIcon, MonitorIcon, CpuIcon, HardDriveIcon, ShoppingBagIcon, GamepadIcon, PowerIcon, MoonIcon, LogOutIcon, FileTextIcon, SearchIcon, UsersIcon, CodeIcon, Trash2Icon } from 'lucide-react';
export interface LauncherProps {
  onClose: () => void;
  onAppOpen: (app: string) => void;
  onLogout: () => void;
  onSwitchUser: () => void;
  onSleep: () => void;
  onShutdown: () => void;
}
export function Launcher({
  onClose,
  onAppOpen,
  onLogout,
  onSwitchUser,
  onSleep,
  onShutdown
}: LauncherProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmAction, setConfirmAction] = useState<null | { type: 'sleep' | 'switchUser' | 'logout' | 'shutdown'; title: string; message: string }>(null);
  const apps = [{
    id: 'files',
    name: 'Files',
    icon: FolderIcon,
    color: 'from-cloud-blue to-cloud-green'
  }, {
    id: 'photos',
    name: 'Photos',
    icon: ImageIcon,
    color: 'from-cloud-pink to-cloud-purple'
  }, {
    id: 'notes',
    name: 'Notes',
    icon: FileTextIcon,
    color: 'from-cloud-green to-cloud-blue'
  }, {
    id: 'settings',
    name: 'Settings',
    icon: SettingsIcon,
    color: 'from-cloud-gray-dark to-cloud-gray-deeper'
  }, {
    id: 'device-manager',
    name: 'Devices',
    icon: MonitorIcon,
    color: 'from-cloud-blue to-cloud-purple'
  }, {
    id: 'process-manager',
    name: 'Processes',
    icon: CpuIcon,
    color: 'from-cloud-green to-cloud-blue'
  }, {
    id: 'storage-manager',
    name: 'Storage',
    icon: HardDriveIcon,
    color: 'from-cloud-purple to-cloud-pink'
  }, {
    id: 'app-store',
    name: 'App Store',
    icon: ShoppingBagIcon,
    color: 'from-cloud-blue to-cloud-green'
  }, {
    id: 'terminal',
    name: 'Terminal',
    icon: CodeIcon,
    color: 'from-cloud-gray-dark to-cloud-gray-deeper'
  }, {
    id: 'game-mode',
    name: 'Gaming',
    icon: GamepadIcon,
    color: 'from-cloud-pink to-cloud-purple'
  }, { 
    id: 'trash', 
    name: 'Trash', 
    icon: Trash2Icon 
  },];
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleAppClick = (appId: string) => {
    onAppOpen(appId);
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-4xl bg-white/90 dark:bg-dark-bg-light/90 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/20 dark:border-dark-border p-8 animate-scale-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CloudIcon size={48} />
            <div>
              <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                All Apps
              </h2>
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                Click an app to open
              </p>
            </div>
          </div>

          {/* Power Options */}
            <div className="flex items-center gap-2">
            <button onClick={() => setConfirmAction({ type: 'sleep', title: 'Confirm Sleep', message: 'Are you sure you want to put the system to sleep?' })} className="p-3 rounded-cloud-lg bg-cloud-gray/20 hover:bg-cloud-gray/30 transition-colors" title="Sleep">
              <MoonIcon size={20} className="text-cloud-gray-deeper dark:text-dark-text" />
            </button>
            <button onClick={() => setConfirmAction({ type: 'switchUser', title: 'Confirm Switch User', message: 'Switch user now? Unsaved work may be lost.' })} className="p-3 rounded-cloud-lg bg-cloud-purple/20 hover:bg-cloud-purple/30 transition-colors" title="Switch User">
              <UsersIcon size={20} className="text-cloud-purple" />
            </button>
            <button onClick={() => setConfirmAction({ type: 'logout', title: 'Confirm Logout', message: 'Are you sure you want to logout?' })} className="p-3 rounded-cloud-lg bg-cloud-blue/20 hover:bg-cloud-blue/30 transition-colors" title="Logout">
              <LogOutIcon size={20} className="text-cloud-blue" />
            </button>
            <button onClick={() => setConfirmAction({ type: 'shutdown', title: 'Confirm Shutdown', message: 'Are you sure you want to shutdown the system?' })} className="p-3 rounded-cloud-lg bg-red-500/20 hover:bg-red-500/30 transition-colors" title="Shutdown">
              <PowerIcon size={20} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cloud-gray-dark" />
          <Input placeholder="Search apps..." className="pl-12 text-lg" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? <div className="text-center py-12">
            <p className="text-cloud-gray-dark dark:text-dark-text-muted">
              No apps found
            </p>
          </div> : <div className="grid grid-cols-5 gap-6 mb-6">
            {filteredApps.map(app => {
          const Icon = app.icon;
          return <button key={app.id} onClick={() => handleAppClick(app.id)} className="group flex flex-col items-center gap-3 p-4 rounded-cloud-xl hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-all duration-200">
                  <div className={`w-20 h-20 rounded-cloud-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-cloud group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={36} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text text-center">
                    {app.name}
                  </span>
                </button>;
        })}
          </div>}

        {/* Confirm modal for power actions */}
        {confirmAction && <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
            <div className="w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <Window title={confirmAction.title} onClose={() => setConfirmAction(null)} width="w-full" height="h-auto">
                <div className="p-4">
                  <p className="mb-4 text-cloud-gray-dark dark:text-dark-text-muted">{confirmAction.message}</p>
                  <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setConfirmAction(null)}>Cancel</Button>
                    <Button variant="primary" onClick={() => {
                      // call appropriate handler
                      if (confirmAction.type === 'sleep') onSleep();
                      if (confirmAction.type === 'switchUser') onSwitchUser();
                      if (confirmAction.type === 'logout') onLogout();
                      if (confirmAction.type === 'shutdown') onShutdown();
                      setConfirmAction(null);
                      onClose();
                    }}>Confirm</Button>
                  </div>
                </div>
              </Window>
            </div>
          </div>}

        {/* Footer */}
        <div className="text-center">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>;
}