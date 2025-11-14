import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Slider } from '../components/ui/Slider';
import { Button } from '../components/ui/Button';
import { MonitorIcon, WifiIcon, Volume2Icon, BluetoothIcon, LockIcon, AccessibilityIcon, HardDriveIcon, BatteryIcon, CodeIcon, CloudIcon, InfoIcon } from 'lucide-react';
export interface SettingsProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  onOpenStorageManager?: () => void;
  onOpenTerminal?: () => void;
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  selectedWallpaper: number;
  onWallpaperChange: (id: number) => void;
}
export function Settings({
  onClose,
  onMaximize,
  maximized = false,
  onOpenStorageManager,
  onOpenTerminal,
  darkMode,
  onDarkModeChange,
  accentColor,
  onAccentColorChange,
  selectedWallpaper,
  onWallpaperChange
}: SettingsProps) {
  const [selectedCategory, setSelectedCategory] = useState('display');
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(60);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [selectedOutputDevice, setSelectedOutputDevice] = useState('Built-in Speakers');

  const [wifiNetworks, setWifiNetworks] = useState([
    { name: 'Home Network',  signal: 'Excellent', secured: true, connected: true },
    { name: 'Office WiFi',   signal: 'Good',      secured: true, connected: false },
    { name: 'Guest Network', signal: 'Fair',      secured: false, connected: false },
    { name: 'Neighbor WiFi', signal: 'Weak',      secured: true, connected: false }
  ]);

  const [pairedDevices, setPairedDevices] = useState([
    { name: 'PlayStation 5 Controller', type: 'Game Controller', battery: 85, connected: true },
    { name: 'AirPods Pro',              type: 'Audio',           battery: 72, connected: true }
  ]);

  const [availableDevices, setAvailableDevices] = useState([
    { name: 'Magic Mouse', type: 'Mouse' },
    { name: 'Beats Studio', type: 'Headphones' }
  ]);

  const [locationServices, setLocationServices] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const connectedWifi = wifiNetworks.find(n => n.connected);

  const handleConnectNetwork = (name: string) => {
    setWifiNetworks(prev =>
      prev.map(n =>
        n.name === name
          ? { ...n, connected: true }
          : { ...n, connected: false }
      )
    );
    setWifi(true);
  };

  const handlePairDevice = (device: { name: string; type: string }) => {
    setAvailableDevices(prev => prev.filter(d => d.name !== device.name));
    setPairedDevices(prev => [
      ...prev,
      { ...device, battery: 100, connected: true }
    ]);
  };

  const handleDisconnectDevice = (device: { name: string; type: string; battery: number }) => {
    setPairedDevices(prev => prev.filter(d => d.name !== device.name));
    setAvailableDevices(prev => [
      ...prev,
      { name: device.name, type: device.type }
    ]);
  };

  const [textSize, setTextSize] = useState("Medium");
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);


  const categories = [{
    id: 'display',
    label: 'Display',
    icon: MonitorIcon
  }, {
    id: 'network',
    label: 'Network',
    icon: WifiIcon
  }, {
    id: 'sound',
    label: 'Sound',
    icon: Volume2Icon
  }, {
    id: 'bluetooth',
    label: 'Bluetooth',
    icon: BluetoothIcon
  }, {
    id: 'privacy',
    label: 'Privacy',
    icon: LockIcon
  }, {
    id: 'accessibility',
    label: 'Accessibility',
    icon: AccessibilityIcon
  }, {
    id: 'storage',
    label: 'Storage',
    icon: HardDriveIcon
  }, {
    id: 'power',
    label: 'Power',
    icon: BatteryIcon
  }, {
    id: 'cloud',
    label: 'Cloud Sync',
    icon: CloudIcon
  }, {
    id: 'about',
    label: 'About',
    icon: InfoIcon
  }, {
    id: 'developer',
    label: 'Developer',
    icon: CodeIcon
  }];
  const wallpapers = [{
    id: 0,
    name: 'Cloud Gradient',
    gradient: 'from-cloud-green via-cloud-blue/30 to-cloud-purple/20'
  }, {
    id: 1,
    name: 'Ocean Blue',
    gradient: 'from-blue-400 via-blue-500 to-blue-600'
  }, {
    id: 2,
    name: 'Sunset',
    gradient: 'from-orange-400 via-pink-500 to-purple-600'
  }, {
    id: 3,
    name: 'Forest',
    gradient: 'from-green-400 via-green-500 to-green-700'
  }, {
    id: 4,
    name: 'Lavender',
    gradient: 'from-purple-300 via-purple-400 to-purple-500'
  }];
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Settings" onClose={onClose} onMaximize={onMaximize} maximized={maximized} width="w-full max-w-6xl" height="h-[85vh]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-cloud-gray/20 dark:border-dark-border p-4 space-y-2 overflow-auto">
            {categories.map(cat => {
            const Icon = cat.icon;
            return <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-cloud-lg transition-all duration-200
                    ${selectedCategory === cat.id ? 'bg-cloud-green/20 text-cloud-green font-semibold' : 'text-cloud-gray-deeper dark:text-dark-text hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter'}
                  `}>
                  <Icon size={20} />
                  <span className="font-medium">{cat.label}</span>
                </button>;
          })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {selectedCategory === 'display' && <>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                    Appearance
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                          Dark Mode
                        </p>
                        <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                          Use dark theme across the system
                        </p>
                      </div>
                      <Switch 
                        checked={darkMode} 
                        onChange={onDarkModeChange} 
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                        Accent Color
                      </p>
                      <div className="flex gap-3">
                        {['#A8D5BA', '#A8C5E0', '#C5B8E0', '#E0B8D5', '#FBD38D'].map(color => {
                          const isActive = color === accentColor;
                          return (
                            <button
                              key={color}
                              onClick={() => onAccentColorChange(color)}
                              className={`
                                w-12 h-12 rounded-cloud-lg border-2 transition-all shadow-cloud
                                ${isActive ? 'border-white ring-2 ring-cloud-green' : 'border-transparent hover:border-white'}
                              `}
                              style={{ backgroundColor: color }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                        Wallpaper
                      </p>
                      <div className="grid grid-cols-5 gap-3">
                        {wallpapers.map(wallpaper => (
                          <button
                            key={wallpaper.id}
                            onClick={() => onWallpaperChange(wallpaper.id)}
                            className={`
                              aspect-video rounded-cloud-lg bg-gradient-to-br ${wallpaper.gradient} transition-all
                              ${selectedWallpaper === wallpaper.id ? 'ring-4 ring-cloud-green ring-offset-2' : 'hover:scale-105'}
                            `}
                          />
                        ))}
                      </div>
                    </div>

                    <Slider label="Brightness" value={brightness} onChange={setBrightness} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                    Display Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                        Resolution
                      </label>
                      <select className="w-full px-4 py-3 bg-white/60 dark:bg-dark-bg-lighter/60 border-2 border-cloud-gray/30 dark:border-dark-border rounded-cloud focus:outline-none focus:border-cloud-green text-cloud-gray-deeper dark:text-dark-text">
                        <option>1920 × 1080 (Recommended)</option>
                        <option>2560 × 1440</option>
                        <option>3840 × 2160</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                        Refresh Rate
                      </label>
                      <select className="w-full px-4 py-3 bg-white/60 dark:bg-dark-bg-lighter/60 border-2 border-cloud-gray/30 dark:border-dark-border rounded-cloud focus:outline-none focus:border-cloud-green text-cloud-gray-deeper dark:text-dark-text">
                        <option>60 Hz</option>
                        <option>120 Hz</option>
                        <option>144 Hz</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </>}

            {selectedCategory === 'sound' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Sound Settings
                </h3>
                <div className="space-y-6">
                  <Slider label="Volume" value={volume} onChange={setVolume} />

                  <div>
                    <label className="block text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                      Output Device
                    </label>
                    <div className="space-y-2">
                      {['Built-in Speakers', 'AirPods Pro', 'HDMI Audio'].map(deviceName => {
                        const selected = deviceName === selectedOutputDevice;
                        return (
                          <button
                            key={deviceName}
                            onClick={() => setSelectedOutputDevice(deviceName)}
                            className={`
                              w-full p-4 rounded-cloud-lg text-left transition-all
                              ${
                                selected
                                  ? 'bg-cloud-green/10 border-2 border-cloud-green'
                                  : 'bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 border-2 border-transparent hover:bg-cloud-gray/20'
                              }
                            `}
                          >
                            <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                              {deviceName}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>}

            {selectedCategory === 'network' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Wi-Fi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Wi-Fi
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        {wifi
                          ? connectedWifi
                            ? `Connected to "${connectedWifi.name}"`
                            : 'Not connected'
                          : 'Disabled'}
                      </p>
                    </div>
                    <Switch checked={wifi} onChange={setWifi} />
                  </div>

                  {wifi && <div className="space-y-3 pt-4 border-t border-cloud-gray/20 dark:border-dark-border">
                      <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                        Available Networks
                      </p>
                      {wifiNetworks.map(network => (
                        <div
                          key={network.name}
                          onClick={() => !network.connected && handleConnectNetwork(network.name)}
                          className={`
                            p-4 rounded-cloud-lg transition-colors cursor-pointer
                            ${
                              network.connected
                                ? 'bg-cloud-green/10 border-2 border-cloud-green'
                                : 'bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 border-2 border-transparent hover:bg-cloud-gray/20'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {network.secured ? '🔒' : '🔓'}
                              </div>
                              <div>
                                <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                                  {network.name}
                                </p>
                                <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                                  Signal: {network.signal}
                                </p>
                              </div>
                            </div>
                            {network.connected ? (
                              <span className="text-sm font-medium text-cloud-green">
                                Connected
                              </span>
                            ) : (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleConnectNetwork(network.name);
                                }}
                              >
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
}
                </div>
              </Card>}

            {selectedCategory === 'bluetooth' && <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      Bluetooth
                    </h3>
                    <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      {bluetooth
                        ? `${pairedDevices.length} device${pairedDevices.length === 1 ? '' : 's'} connected`
                        : 'Disabled'}
                    </p>
                  </div>
                  <Switch checked={bluetooth} onChange={setBluetooth} />
                </div>

                {bluetooth && <>
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                        Paired Devices
                      </p>
                                            <div className="space-y-3">
                        {pairedDevices.map(device => (
                          <div
                            key={device.name}
                            className="p-4 bg-cloud-green/10 border-2 border-cloud-green rounded-cloud-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">🔵</div>
                                <div>
                                  <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                                    {device.name}
                                  </p>
                                  <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                                    {device.type} • {device.battery}% battery
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDisconnectDevice(device)}
                              >
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                        Available Devices
                      </p>
                                            <div className="space-y-3">
                        {availableDevices.map(device => (
                          <div
                            key={device.name}
                            className="p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg hover:bg-cloud-gray/20 transition-colors cursor-pointer"
                            onClick={() => handlePairDevice(device)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">⚪</div>
                                <div>
                                  <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                                    {device.name}
                                  </p>
                                  <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                                    {device.type}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  handlePairDevice(device);
                                }}
                              >
                                Pair
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>}
              </Card>}

            {selectedCategory === 'storage' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Storage Overview
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      540 GB of 1 TB used
                    </span>
                    <span className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                      54%
                    </span>
                  </div>
                  <div className="h-3 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cloud-green to-cloud-blue rounded-full" style={{
                  width: '54%'
                }} />
                  </div>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => {
              if (onOpenStorageManager) {
                onClose();
                onOpenStorageManager();
              }
            }}>
                  Manage Storage
                </Button>
              </Card>}

            {selectedCategory === 'power' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Power & Battery
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-cloud-green/10 rounded-cloud-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Battery Level
                      </span>
                      <span className="text-2xl font-bold text-cloud-green">
                        85%
                      </span>
                    </div>
                    <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      4 hours 32 minutes remaining
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text mb-3">
                      Power Mode
                    </label>
                    <div className="space-y-2">
                      {[{
                    name: 'Best Performance',
                    desc: 'Maximum performance, higher power usage'
                  }, {
                    name: 'Balanced',
                    desc: 'Balance between performance and battery life',
                    selected: true
                  }, {
                    name: 'Power Saver',
                    desc: 'Extend battery life, reduced performance'
                  }].map((mode, i) => <button key={i} className={`
                            w-full p-4 rounded-cloud-lg text-left transition-all
                            ${mode.selected ? 'bg-cloud-green/10 border-2 border-cloud-green' : 'bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 border-2 border-transparent hover:bg-cloud-gray/20'}
                          `}>
                          <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-1">
                            {mode.name}
                          </p>
                          <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                            {mode.desc}
                          </p>
                        </button>)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Low Power Mode
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Automatically enable at 20% battery
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>
                </div>
              </Card>}

            {selectedCategory === 'developer' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Developer Options
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Developer Mode
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Enable advanced development features
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Show Hidden Files
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Display system and hidden files
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        USB Debugging
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Allow debugging via USB connection
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <Button variant="secondary" className="w-full" onClick={() => {
                    if (onOpenTerminal) {
                      onClose();
                      onOpenTerminal();
                    }
                  }}>
                    Open Terminal
                  </Button>
                </div>
              </Card>}

            {selectedCategory === 'about' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-6">
                  About This Device
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      Device Name
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      CloudOS Computer
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      OS Version
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      CloudOS 2.1.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      Processor
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      Intel Core i7-12700K
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      Memory
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      16 GB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      Graphics
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      NVIDIA RTX 4070
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      Serial Number
                    </span>
                    <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      C02XYZ123456
                    </span>
                  </div>
                </div>
              </Card>}

            {selectedCategory === 'cloud' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Cloud Account
                </h3>
                <div className="flex items-center gap-4 mb-6 p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cloud-green to-cloud-blue flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      John Doe
                    </p>
                    <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                      john.doe@cloudos.com
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Auto Sync
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Automatically sync files to cloud
                      </p>
                    </div>
                    <Switch checked={autoUpdate} onChange={setAutoUpdate} />
                  </div>

                  <div className="p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Storage Used
                      </p>
                      <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        42.8 GB of 100 GB
                      </p>
                    </div>
                    <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                      <div className="h-full bg-cloud-green rounded-full" style={{
                    width: '42.8%'
                  }} />
                    </div>
                  </div>
                </div>
              </Card>}

            {selectedCategory === 'privacy' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Privacy & Security
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Notifications
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Show system notifications
                      </p>
                    </div>
                    <Switch checked={notifications} onChange={setNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Location Services
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Allow apps to access your location
                      </p>
                    </div>
                    <Switch checked={locationServices} onChange={setLocationServices} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Analytics
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Share usage data to improve CloudOS
                      </p>
                    </div>
                    <Switch checked={analytics} onChange={setAnalytics} />
                  </div>
                </div>
              </Card>}

            {selectedCategory === 'accessibility' && <Card className="p-6">
                <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Accessibility Options
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Increase Contrast
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Make text and UI elements more visible
                      </p>
                    </div>
                    <Switch checked={highContrast} onChange={setHighContrast} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Reduce Motion
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch checked={screenReader} onChange={setScreenReader} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        Screen Reader
                      </p>
                      <p className="text-sm text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                        Enable voice feedback for UI elements
                      </p>
                    </div>
                    <Switch checked={reduceMotion} onChange={setReduceMotion} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cloud-gray-dark dark:text-dark-text-muted mb-3">
                      Text Size
                    </label>

                    <div className="space-y-2">
                      {["Small", "Medium", "Large", "Extra Large"].map(size => {
                        const active = textSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setTextSize(size)}
                            className={`
                              w-full p-4 rounded-cloud-lg text-left transition-all
                              ${active
                                ? "bg-cloud-green/10 border-2 border-cloud-green"
                                : "bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 border-2 border-transparent hover:bg-cloud-gray/20"}
                            `}
                          >
                            <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">{size}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </Card>}
          </div>
        </div>
      </Window>
    </div>;
}