import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Slider } from '../components/ui/Slider';
import { Button } from '../components/ui/Button';
import { WifiIcon, BluetoothIcon, AirplayIcon, MoonIcon, SunIcon, Volume2Icon, BatteryIcon, MonitorIcon, XIcon } from 'lucide-react';
export interface QuickSettingsProps {
  onClose: () => void;
  onOpenSettings?: () => void;
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}
export function QuickSettings({
  onClose,
  onOpenSettings,
  darkMode,
  onDarkModeChange
}: QuickSettingsProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [volume, setVolume] = useState(60);
  const [brightness, setBrightness] = useState(80);
  const [airplayOn, setAirplayOn] = useState(false);
  const handleOpenSettings = () => {
    onClose();
    if (onOpenSettings) {
      onOpenSettings();
    }
  };
  return <div className="fixed inset-0 z-50 flex items-start justify-end p-6 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="w-96 bg-white/80 dark:bg-dark-bg-light/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg border border-cloud-gray/20 dark:border-dark-border p-6 animate-slide-left" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-cloud-gray-deeper dark:text-dark-text">
            Quick Settings
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter rounded-cloud transition-colors">
            <XIcon size={20} className="text-cloud-gray-deeper dark:text-dark-text" />
          </button>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => setWifi(!wifi)} className={`
              p-4 rounded-cloud-lg transition-all duration-200
              ${wifi ? 'bg-cloud-green/20 border-2 border-cloud-green' : 'bg-cloud-gray/20 border-2 border-transparent'}
            `}>
            <WifiIcon size={24} className={wifi ? 'text-cloud-green' : 'text-cloud-gray-dark'} />
            <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mt-2">
              Wi-Fi
            </p>
            <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
              {wifi ? 'Connected' : 'Off'}
            </p>
          </button>

          <button onClick={() => setBluetooth(!bluetooth)} className={`
              p-4 rounded-cloud-lg transition-all duration-200
              ${bluetooth ? 'bg-cloud-blue/20 border-2 border-cloud-blue' : 'bg-cloud-gray/20 border-2 border-transparent'}
            `}>
            <BluetoothIcon size={24} className={bluetooth ? 'text-cloud-blue' : 'text-cloud-gray-dark'} />
            <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mt-2">
              Bluetooth
            </p>
            <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
              {bluetooth ? '2 devices' : 'Off'}
            </p>
          </button>

          <button
            onClick={() => setAirplayOn(!airplayOn)}
            className={`
              p-4 rounded-cloud-lg transition-all duration-200
              ${airplayOn
                ? 'bg-cloud-purple/20 border-2 border-cloud-purple'
                : 'bg-cloud-gray/20 border-2 border-transparent hover:bg-cloud-gray/30'}
            `}
          >
            <AirplayIcon
              size={24}
              className={airplayOn ? 'text-cloud-purple' : 'text-cloud-gray-dark'}
            />
            <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mt-2">
              AirPlay
            </p>
            <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
              {airplayOn ? 'Casting Enabled' : 'Off'}
            </p>
          </button>


          <button onClick={() => onDarkModeChange(!darkMode)} className={`
              p-4 rounded-cloud-lg transition-all duration-200
              ${darkMode ? 'bg-cloud-purple/20 border-2 border-cloud-purple' : 'bg-cloud-gray/20 border-2 border-transparent'}
            `}>
            {darkMode ? <MoonIcon size={24} className="text-cloud-purple" /> : <SunIcon size={24} className="text-cloud-gray-dark" />}
            <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mt-2">
              {darkMode ? 'Dark' : 'Light'}
            </p>
            <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
              Theme
            </p>
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-6 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-cloud bg-cloud-green/20 flex items-center justify-center">
                <Volume2Icon size={20} className="text-cloud-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                  Volume
                </p>
                <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                  {volume}%
                </p>
              </div>
            </div>
            <Slider value={volume} onChange={setVolume} />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-cloud bg-cloud-blue/20 flex items-center justify-center">
                <MonitorIcon size={20} className="text-cloud-blue" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                  Brightness
                </p>
                <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                  {brightness}%
                </p>
              </div>
            </div>
            <Slider value={brightness} onChange={setBrightness} />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-cloud bg-cloud-green/20 flex items-center justify-center">
                  <BatteryIcon size={20} className="text-cloud-green" />
                </div>
                <div>
                  <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                    Battery
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    85% • 4h 32m remaining
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <Button variant="secondary" className="w-full" onClick={handleOpenSettings}>
          Open System Settings
        </Button>
      </div>
    </div>;
}