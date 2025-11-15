import { useEffect, useState } from 'react';
import { BIOSScreen } from './pages/BIOSScreen';
import { BootScreen } from './pages/BootScreen';
import { LoginScreen } from './pages/LoginScreen';
import { AccountCreation } from './pages/AccountCreation';
import { Desktop } from './pages/Desktop';
import { QuickSettings } from './pages/QuickSettings';
import { Notifications } from './pages/Notifications';
import { Launcher } from './pages/Launcher';
import { FileManager } from './pages/FileManager';
import { Photos } from './pages/Photos';
import { Notes } from './pages/Notes';
import { PDFViewer } from './pages/PDFViewer';
import { DocumentViewer } from './pages/DocumentViewer';
import { DeviceManager } from './pages/DeviceManager';
import { ProcessManager } from './pages/ProcessManager';
import { MemoryManager } from './pages/MemoryManager';
import { StorageManager } from './pages/StorageManager';
import { Settings } from './pages/Settings';
import { Terminal } from './pages/Terminal';
import { AppStore } from './pages/AppStore';
import { GameMode } from './pages/GameMode';
import { CloudDrive } from './pages/CloudDrive';
import { Calculator } from './pages/Calculator';
import { Trash } from './pages/Trash';
import { GameLibrary } from './pages/GameLibrary';
import { Browser } from './pages/Browser';
import { Game } from './pages/Game';
import { User, defaultNote } from './Interfaces';
import { firebase } from './firebase';
import { MusicPlayer } from './pages/MusicPlayer';
import { VideoPlayer } from './pages/VideoPlayer';
import { SystemTray } from './components/desktop/SystemTray';
import { Dock } from './components/desktop/Dock';

type Screen = 'bios' | 'boot' | 'login' | 'account-creation' | 'desktop';
type App = 'files' | 'photos' | 'notes' | 'pdf-viewer' | 'document-viewer' | 'device-manager' | 'process-manager' | 'memory-manager' | 'storage-manager' | 'settings' | 
'app-store' | 'game-mode' | 'cloud-drive' | 'terminal' | 'calculator' | 'trash' | 'game-library' | 'browser' | 'game' | 'music-player' | 'video-player' | null;

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('bios');
  const [openApps, setOpenApps] = useState<App[]>([]);
  const [maximizedApp, setMaximizedApp] = useState<App | null>(null);
  const [cloudOSDriveIslandEnabled, setCloudOSDriveIslandEnabled] = useState(true);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedGameTitle, setSelectedGameTitle] = useState<string>('Genshin Impact');

  // User management
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    firebase.getUsers().then(users => {
      setUsers(users);
    })
  },[]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [fileManagerCategory, setFileManagerCategory] = useState<'home' | 'desktop' | 'documents' | 'pictures' | 'downloads' | 'cloud' | 'usb' | 'trash'>('home');
  const [photoFolder, setPhotoFolder] = useState('All Photos');
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Untitled');
  const [pdfFileName, setPdfFileName] = useState('');
  const [documentFileName, setDocumentFileName] = useState('');
  const [videoFileName, setVideoFileName] = useState('');
  const [trashCount] = useState(0);
  
  // Cloud Drive state
  const [cloudFileCount] = useState(4);
  const [cloudSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('synced');
  
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#A8D5BA');
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('desktop');
  };

  const handleSwitchUser = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setOpenApps([]);
    setShowLauncher(false);
  };

  const handleAppOpen = (appId: string) => {
    if (appId === 'launcher') {
      setShowLauncher(true);
      return;
    }
    if (appId === 'app-grid') {
      setShowLauncher(true);
      return;
    }
    // Handle special file manager routes
    if (appId === 'files-documents') {
      setFileManagerCategory('documents');
      setOpenApps(prev => {
        if (prev.includes('files')) {
          return [...prev.filter(a => a !== 'files'), 'files'] as App[];
        }
        const newApps = [...prev, 'files'] as App[];
        return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
      });
      return;
    }
    if (appId === 'files-desktop') {
      setFileManagerCategory('desktop');
      setOpenApps(prev => {
        if (prev.includes('files')) {
          return [...prev.filter(a => a !== 'files'), 'files'] as App[];
        }
        const newApps = [...prev, 'files'] as App[];
        return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
      });
      return;
    }
    // Add app to open apps if not already open
    let appToOpen: App = null;
    if (appId === 'files') appToOpen = 'files';
    else if (appId === 'photos') appToOpen = 'photos';
    else if (appId === 'notes') appToOpen = 'notes';
    else if (appId === 'calculator') appToOpen = 'calculator';
    else if (appId === 'device-manager') appToOpen = 'device-manager';
    else if (appId === 'process-manager') appToOpen = 'process-manager';
    else if (appId === 'memory-manager') appToOpen = 'memory-manager';
    else if (appId === 'storage-manager') appToOpen = 'storage-manager';
    else if (appId === 'settings') appToOpen = 'settings';
    else if (appId === 'app-store') appToOpen = 'app-store';
    else if (appId === 'game-mode') appToOpen = 'game-mode';
    else if (appId === 'terminal') appToOpen = 'terminal';
    else if (appId === 'trash') appToOpen = 'trash';
    else if (appId === 'game-library') appToOpen = 'game-library';
    else if (appId === 'browser') appToOpen = 'browser';
    else if (appId === 'game') appToOpen = 'game';
    else if (appId === 'music-player') appToOpen = 'music-player';
    else if (appId === 'video-player') appToOpen = 'video-player';

    if (appToOpen) {
      setOpenApps(prev => {
        // If app is already open, move it to the end (bring to focus/top)
        if (prev.includes(appToOpen)) {
          return [...prev.filter(a => a !== appToOpen), appToOpen] as App[];
        }
        // Otherwise add it to the end, but limit to 3 windows max
        const newApps = [...prev, appToOpen] as App[];
        if (newApps.length > 3) {
          // Remove the oldest (first) window
          return newApps.slice(1) as App[];
        }
        return newApps;
      });
    }
  };
  const handleOpenPhoto = (folder: string) => {
    setPhotoFolder(folder);
    setOpenApps(prev => {
      if (prev.includes('photos')) {
        return [...prev.filter(a => a !== 'photos'), 'photos'] as App[];
      }
      const newApps = [...prev, 'photos'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleOpenNote = (content: string, title: string) => {
    setNoteContent(content);
    setNoteTitle(title);
    setOpenApps(prev => {
      if (prev.includes('notes')) {
        return [...prev.filter(a => a !== 'notes'), 'notes'] as App[];
      }
      const newApps = [...prev, 'notes'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleOpenPDF = (fileName: string) => {
    setPdfFileName(fileName);
    setOpenApps(prev => {
      if (prev.includes('pdf-viewer')) {
        return [...prev.filter(a => a !== 'pdf-viewer'), 'pdf-viewer'] as App[];
      }
      const newApps = [...prev, 'pdf-viewer'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleOpenDocument = (fileName: string) => {
    setDocumentFileName(fileName);
    setOpenApps(prev => {
      if (prev.includes('document-viewer')) {
        return [...prev.filter(a => a !== 'document-viewer'), 'document-viewer'] as App[];
      }
      const newApps = [...prev, 'document-viewer'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleOpenMusic = (fileName: string) => {
    setOpenApps(prev => {
      if (prev.includes('music-player')) {
        return [...prev.filter(a => a !== 'music-player'), 'music-player'] as App[];
      }
      const newApps = [...prev, 'music-player'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleOpenVideo = (fileName: string) => {
    setVideoFileName(fileName);
    setOpenApps(prev => {
      if (prev.includes('video-player')) {
        return [...prev.filter(a => a !== 'video-player'), 'video-player'] as App[];
      }
      const newApps = [...prev, 'video-player'] as App[];
      return newApps.length > 3 ? (newApps.slice(1) as App[]) : newApps;
    });
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setOpenApps([]);
    setShowLauncher(false);
  };
  const handleSleep = () => {
    alert('System going to sleep...');
  };
  const handleShutdown = () => {
    setCurrentScreen('bios');
    setOpenApps([]);
    setShowLauncher(false);
  };

  const handleMaximize = (app: App) => {
    setMaximizedApp(app === maximizedApp ? null : app);
  };
  const handleCloseApp = (app: App) => {
    setOpenApps(prev => prev.filter(a => a !== app));
    if (maximizedApp === app) {
      setMaximizedApp(null);
    }
  };

  const getZIndex = (app: App) => {
    const index = openApps.indexOf(app);
    return index === -1 ? 0 : 40 + index;
  };

  // Helper to render each window based on app type
  const renderWindow = (app: App) => {
    switch(app) {
      case 'files':
        return (
          <FileManager 
            key="files"
            onClose={() => { handleCloseApp('files'); setFileManagerCategory('home'); }} 
            initialCategory={fileManagerCategory} 
            onOpenPhoto={handleOpenPhoto} 
            onOpenNote={handleOpenNote} 
            onOpenPDF={handleOpenPDF} 
            onOpenDocument={handleOpenDocument}
            onOpenMusic={handleOpenMusic}
            onOpenVideo={handleOpenVideo}
            onMaximize={() => handleMaximize('files')}
            maximized={maximizedApp === 'files'}
            zIndex={getZIndex('files')}
          />
        );
      case 'photos':
        return (
          <Photos 
            key="photos"
            onClose={() => handleCloseApp('photos')} 
            initialFolder={photoFolder}
            onMaximize={() => handleMaximize('photos')}
            maximized={maximizedApp === 'photos'}
            zIndex={getZIndex('photos')}
          />
        );
      case 'notes':
        return (
          <Notes 
            key="notes"
            onClose={() => handleCloseApp('notes')} 
            initialContent={noteContent} 
            initialTitle={noteTitle}
            onMaximize={() => handleMaximize('notes')}
            maximized={maximizedApp === 'notes'}
            zIndex={getZIndex('notes')}
          />
        );
      case 'calculator':
        return (
          <Calculator 
            key="calculator"
            onClose={() => handleCloseApp('calculator')} 
            onMaximize={() => handleMaximize('calculator')}
            maximized={maximizedApp === 'calculator'}
            zIndex={getZIndex('calculator')}
          />
        );
      case 'pdf-viewer':
        return (
          <PDFViewer 
            key="pdf-viewer"
            onClose={() => handleCloseApp('pdf-viewer')} 
            fileName={pdfFileName}
            onMaximize={() => handleMaximize('pdf-viewer')}
            maximized={maximizedApp === 'pdf-viewer'}
            zIndex={getZIndex('pdf-viewer')}
          />
        );
      case 'document-viewer':
        return (
          <DocumentViewer 
            key="document-viewer"
            onClose={() => handleCloseApp('document-viewer')} 
            fileName={documentFileName}
            onMaximize={() => handleMaximize('document-viewer')}
            maximized={maximizedApp === 'document-viewer'}
            zIndex={getZIndex('document-viewer')}
          />
        );
      case 'device-manager':
        return (
          <DeviceManager 
            key="device-manager"
            onClose={() => handleCloseApp('device-manager')} 
            onMaximize={() => handleMaximize('device-manager')}
            maximized={maximizedApp === 'device-manager'}
            zIndex={getZIndex('device-manager')}
          />
        );
      case 'process-manager':
        return (
          <ProcessManager 
            key="process-manager"
            onClose={() => handleCloseApp('process-manager')} 
            onMaximize={() => handleMaximize('process-manager')}
            maximized={maximizedApp === 'process-manager'}
            zIndex={getZIndex('process-manager')}
          />
        );
      case 'memory-manager':
        return (
          <MemoryManager 
            key="memory-manager"
            onClose={() => handleCloseApp('memory-manager')} 
            onMaximize={() => handleMaximize('memory-manager')}
            maximized={maximizedApp === 'memory-manager'}
            zIndex={getZIndex('memory-manager')}
          />
        );
      case 'storage-manager':
        return (
          <StorageManager 
            key="storage-manager"
            onClose={() => handleCloseApp('storage-manager')} 
            onMaximize={() => handleMaximize('storage-manager')}
            maximized={maximizedApp === 'storage-manager'}
            zIndex={getZIndex('storage-manager')}
          />
        );
      case 'settings':
        return (
          <Settings 
            key="settings"
            onClose={() => handleCloseApp('settings')} 
            onOpenStorageManager={() => setOpenApps(prev => prev.includes('storage-manager') ? prev : [...prev, 'storage-manager'])} 
            onOpenTerminal={() => setOpenApps(prev => prev.includes('terminal') ? prev : [...prev, 'terminal'])}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
            accentColor={accentColor}
            onAccentColorChange={setAccentColor}
            selectedWallpaper={selectedWallpaper}
            onWallpaperChange={handleWallpaperChange}
            onMaximize={() => handleMaximize('settings')}
            maximized={maximizedApp === 'settings'}
            cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
            onCloudOSDriveIslandChange={setCloudOSDriveIslandEnabled}
            wifiEnabled={wifiEnabled}
            onWifiChange={setWifiEnabled}
            zIndex={getZIndex('settings')}
            bluetoothEnabled={bluetoothEnabled}
            onBluetoothChange={setBluetoothEnabled}
            pairedDevices={pairedDevices}
            onPairedDevicesChange={setPairedDevices}
          />
        );
      case 'terminal':
        return (
          <Terminal 
            key="terminal"
            onClose={() => handleCloseApp('terminal')} 
            onMaximize={() => handleMaximize('terminal')}
            maximized={maximizedApp === 'terminal'}
            zIndex={getZIndex('terminal')}
          />
        );
      case 'app-store':
        return (
          <AppStore 
            key="app-store"
            onClose={() => handleCloseApp('app-store')} 
            onMaximize={() => handleMaximize('app-store')}
            maximized={maximizedApp === 'app-store'}
            zIndex={getZIndex('app-store')}
          />
        );
      case 'game-mode':
        return (
          <GameMode 
            key="game-mode"
            onClose={() => handleCloseApp('game-mode')} 
            onMaximize={() => handleMaximize('game-mode')}
            maximized={maximizedApp === 'game-mode'}
            zIndex={getZIndex('game-mode')}
            bluetoothEnabled={bluetoothEnabled}
            controllers={pairedDevices}
            onToggleController={(name) => {
              setPairedDevices(prev =>
                prev.map(d =>
                  d.name === name
                    ? { ...d, connected: !d.connected }
                    : d
                )
              );
            }}
          />
        );
      case 'cloud-drive':
        return (
          <CloudDrive 
            key="cloud-drive"
            onClose={() => handleCloseApp('cloud-drive')}
            zIndex={getZIndex('cloud-drive')}
          />
        );
      case 'trash':
        return (
          <Trash
            key="trash"
            onClose={() => handleCloseApp('trash')}
            onMaximize={() => handleMaximize('trash')}
            maximized={maximizedApp === 'trash'}
            zIndex={getZIndex('trash')}
          />
        );
      case 'game-library':
        return (
          <GameLibrary
            key="game-library"
            onClose={() => handleCloseApp('game-library')}
            onMaximize={() => handleMaximize('game-library')}
            maximized={maximizedApp === 'game-library'}
            onPlayGame={(gameName) => {
              setSelectedGameTitle(gameName);
              setOpenApps(prev => prev.includes('game') ? prev : [...prev, 'game']);
              setMaximizedApp('game');
            }}
            zIndex={getZIndex('game-library')}
          />
        );
      case 'browser':
        return (
          <Browser
            key="browser"
            wifiEnabled={wifiEnabled}
            onClose={() => handleCloseApp('browser')}
            onMaximize={() => handleMaximize('browser')}
            maximized={maximizedApp === 'browser'}
            zIndex={getZIndex('browser')}
          />
        );
      case 'game':
        return (
          <Game
            key="game"
            gameTitle={selectedGameTitle}
            onClose={() => handleCloseApp('game')}
            onMaximize={() => handleMaximize('game')}
            maximized={maximizedApp === 'game'}
            zIndex={getZIndex('game')}
          />
        );
      case 'music-player':
        return (
          <MusicPlayer
            key="music-player"
            onClose={() => handleCloseApp('music-player')}
            onMaximize={() => handleMaximize('music-player')}
            maximized={maximizedApp === 'music-player'}
            zIndex={getZIndex('music-player')}
          />
        );
      case 'video-player':
        return (
          <VideoPlayer
            key="video-player"
            videoFileName={videoFileName}
            onClose={() => handleCloseApp('video-player')}
            onMaximize={() => handleMaximize('video-player')}
            maximized={maximizedApp === 'video-player'}
            zIndex={getZIndex('video-player')}
          />
        );
      default:
        return null;
    }
  };

  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [pairedDevices, setPairedDevices] = useState([
    { name: 'PlayStation 5 Controller', type: 'Game Controller', battery: 85, connected: true },
    { name: 'AirPods Pro', type: 'Audio', battery: 72, connected: true },
  ]);

  const handleWallpaperChange = (id: number) => {
  setSelectedWallpaper(id);

  const accentMap: Record<number, string> = {
    0: '#A8D5BA',
    1: '#60A5FA',
    2: '#F97316',
    3: '#22C55E',
    4: '#A855F7',
  };

  setAccentColor(accentMap[id] ?? '#A8D5BA');
  };

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''}`}>
      {currentScreen === 'bios' && <BIOSScreen onContinue={() => setCurrentScreen('boot')} />}
      {currentScreen === 'boot' && <BootScreen onComplete={() => setCurrentScreen('login')} />}
      {currentScreen === 'login' && <LoginScreen users={users} onLogin={handleUserLogin} onCreateAccount={() => setCurrentScreen('account-creation')} />}
      {currentScreen === 'account-creation' && <AccountCreation onComplete={() => setCurrentScreen('login')} />}
      {currentScreen === 'desktop' && currentUser && <>
        <Desktop 
          currentUser={currentUser}
          onAppOpen={handleAppOpen} 
          onQuickSettingsOpen={() => setShowQuickSettings(true)} 
          onNotificationsOpen={() => setShowNotifications(true)} 
          trashCount={trashCount}
          cloudFileCount={cloudFileCount}
          cloudSyncStatus={cloudSyncStatus}
          maximizedApp={maximizedApp}
          cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
        />
        {/* System Tray - rendered at app level to respond to window state independently */}
        <SystemTray 
          onQuickSettingsClick={() => setShowQuickSettings(true)} 
          onNotificationsClick={() => setShowNotifications(true)} 
          notificationCount={3}
          hasOpenWindows={maximizedApp !== null}
        />
        {/* Dock - hidden when window is maximized */}
        {maximizedApp === null && <Dock onAppClick={handleAppOpen} trashCount={trashCount} />}
        {/* Backdrop blur overlay when windows are open */}
        {openApps.length > 0 && (
          <div className="fixed inset-0 backdrop-blur-sm z-[35] pointer-events-none" />
        )}
        {showQuickSettings && (
          <QuickSettings
            onClose={() => setShowQuickSettings(false)}
            onOpenSettings={() => {
              setShowQuickSettings(false);
              setOpenApps(prev => prev.includes('settings') ? prev : [...prev, 'settings']);
            }}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
            cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
            onCloudOSDriveIslandChange={setCloudOSDriveIslandEnabled}
            wifiEnabled={wifiEnabled}
            onWifiChange={setWifiEnabled}
          />
        )}
        {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
        {showLauncher && <Launcher onClose={() => setShowLauncher(false)} onAppOpen={handleAppOpen} onLogout={handleLogout} onSwitchUser={handleSwitchUser} onSleep={handleSleep} onShutdown={handleShutdown} />}
        {/* Render windows in openApps order for correct DOM stacking */}
        {openApps.map(app => renderWindow(app))}
      </>}
    </div>
  );
}