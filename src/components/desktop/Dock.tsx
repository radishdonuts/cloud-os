import { FolderIcon, ImageIcon, SettingsIcon, Grid3x3Icon, MonitorIcon, CpuIcon, HardDriveIcon, ShoppingBagIcon, TrashIcon, FileTextIcon, CodeIcon, Globe, Joystick } from 'lucide-react';
export interface DockProps {
  onAppClick: (app: string) => void;
  trashCount?: number;
}
export function Dock({
  onAppClick,
  trashCount = 0
}: DockProps) {
  const apps = [
    {
      id: 'files',
      name: 'Files',
      icon: FolderIcon,
      color: 'from-cloud-blue to-cloud-green'
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: ImageIcon,
      color: 'from-cloud-pink to-cloud-purple'
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: FileTextIcon,
      color: 'from-cloud-green to-cloud-blue'
    },
    {
      id: 'browser',
      name: 'Strato',
      icon: Globe,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'game-library',
      name: 'Game Library',
      icon: Joystick,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'app-store',
      name: 'Cumula',
      icon: ShoppingBagIcon,
      color: 'from-cloud-blue to-cloud-green'
    }
  ];
  const systemApps = [{
    id: 'process-manager',
    name: 'Processes',
    icon: CpuIcon
  }, {
    id: 'device-manager',
    name: 'Devices',
    icon: MonitorIcon
  }, {
    id: 'storage-manager',
    name: 'Storage',
    icon: HardDriveIcon
  }, {
    id: 'terminal',
    name: 'Terminal',
    icon: CodeIcon
  }, {
    id: 'settings',
    name: 'Settings',
    icon: SettingsIcon,
    color: 'from-cloud-gray-dark to-cloud-gray-deeper'
  },
  ];
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-white/60 dark:bg-dark-bg-light/60 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/30 dark:border-dark-border px-3 py-3 flex items-center gap-2">
        {/* Cloud Launcher */}
        <button onClick={() => onAppClick('launcher')} className="
          group relative w-14 h-14 rounded-cloud-lg bg-gradient-to-br from-cloud-green to-cloud-green-dark
          flex items-center justify-center shadow-cloud
          transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-1
        ">
          <span
            className="
              absolute inset-0 
              rounded-cloud-lg 
              bg-white/40 dark:bg-dark-bg-light/40 
              blur-xl 
              opacity-0 group-hover:opacity-100 
              transition-all duration-300
              after:content-[''] after:absolute after:inset-0 after:rounded-cloud-lg 
              after:bg-white/20 after:blur-3xl after:opacity-0 group-hover:after:opacity-80 
              after:transition-all after:duration-500
            "
          />
          <img src="/icons/CloudIcon.png" alt="Cloud" className="w-7 h-7" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-bg-light text-white text-xs rounded-cloud opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Launcher
          </div>
        </button>

        <div className="w-px h-10 bg-cloud-gray/30 dark:bg-dark-border mx-1" />

        {/* Main Apps */}
        {apps.map(app => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`
                group relative w-14 h-14 rounded-cloud-lg bg-gradient-to-br ${app.color}
                flex items-center justify-center shadow-cloud
                transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-1
              `}
            >
              <span
                className="
                  absolute inset-0 
                  rounded-cloud-lg 
                  bg-white/40 dark:bg-dark-bg-light/40 
                  blur-xl 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-300
                  after:content-[''] after:absolute after:inset-0 after:rounded-cloud-lg 
                  after:bg-white/20 after:blur-3xl after:opacity-0 group-hover:after:opacity-80 
                  after:transition-all after:duration-500
                "/>
                <Icon size={24} className="text-white z-10" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-bg-light text-white text-xs rounded-cloud opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {app.name}
              </div>
            </button>
          );
        })}

        <div className="w-px h-10 bg-cloud-gray/30 dark:bg-dark-border mx-1" />

        {/* System Apps */}
        {systemApps.map(app => {
        const Icon = app.icon;
        return (
          <button key={app.id} onClick={() => onAppClick(app.id)} className={`
            group relative w-14 h-14 rounded-cloud-lg bg-cloud-gray/30 dark:bg-dark-bg-lighter/60
            flex items-center justify-center
            transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-1
          `}>
            <span
              className="
                absolute inset-0 
                rounded-cloud-lg 
                bg-white/40 dark:bg-dark-bg-light/40 
                blur-xl 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300
                after:content-[''] after:absolute after:inset-0 after:rounded-cloud-lg 
                after:bg-white/20 after:blur-3xl after:opacity-0 group-hover:after:opacity-80 
                after:transition-all after:duration-500
              "
            />
              <Icon size={24} className="text-cloud-gray-deeper dark:text-dark-text z-10" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-bg-light text-white text-xs rounded-cloud opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {app.name}
            </div>
          </button>
        );
      })}

        <div className="w-px h-10 bg-cloud-gray/30 dark:bg-dark-border mx-1" />

        {/* Trash */}
        <button onClick={() => onAppClick('trash')} className={`
            group relative w-14 h-14 rounded-cloud-lg bg-cloud-gray/30 dark:bg-dark-bg-lighter/60
            hover:bg-cloud-gray/50 dark:hover:bg-dark-bg-lighter
            transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-1
            flex items-center justify-center
            ${trashCount > 0 ? 'bg-red-500/10' : ''}
          `}>
          <span
            className="absolute inset-0 rounded-cloud-lg bg-white/40 dark:bg-dark-bg-light/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 after:content-[''] after:absolute after:inset-0 after:rounded-cloud-lg after:bg-white/20 after:blur-3xl after:opacity-0 group-hover:after:opacity-80 after:transition-all after:duration-500"
          />
          <TrashIcon size={24} className={trashCount > 0 ? 'text-red-500' : 'text-cloud-gray-deeper dark:text-dark-text'} />
          {trashCount > 0 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {trashCount}
            </div>}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-bg-light text-white text-xs rounded-cloud opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Trash
          </div>
        </button>

        {/* App Grid */}
        <button onClick={() => onAppClick('app-grid')} className="group relative w-14 h-14 rounded-cloud-lg bg-cloud-gray/30 dark:bg-dark-bg-lighter/60 hover:bg-cloud-gray/50 dark:hover:bg-dark-bg-lighter hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center">
          <span
            className="absolute inset-0 rounded-cloud-lg bg-white/40 dark:bg-dark-bg-light/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 after:content-[''] after:absolute after:inset-0 after:rounded-cloud-lg after:bg-white/20 after:blur-3xl after:opacity-0 group-hover:after:opacity-80 after:transition-all after:duration-500"
          />
          <Grid3x3Icon size={24} className="text-cloud-gray-deeper dark:text-dark-text" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-bg-light text-white text-xs rounded-cloud opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            All Apps
          </div>
        </button>
      </div>
    </div>;
}