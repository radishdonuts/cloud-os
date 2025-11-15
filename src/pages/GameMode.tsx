import { useState, useEffect } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';
import { GamepadIcon, MonitorIcon, MicIcon, VideoIcon, CameraIcon, TrendingUpIcon } from 'lucide-react';
export interface GameModeProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
  bluetoothEnabled?: boolean;
  controllers?: {
    name: string;
    type: string;
    battery: number;
    connected: boolean;
  }[];
  onToggleController?: (name: string) => void;
}
export function GameMode({
  onClose,
  onMaximize,
  maximized = false,
  zIndex = 40,
  bluetoothEnabled = false,
  controllers = [],
  onToggleController,
}: GameModeProps) {
  const [gameMode, setGameMode] = useState(true);
  const [recording, setRecording] = useState(false);
  const [showFPS, setShowFPS] = useState(true);
  const [showTemperature, setShowTemperature] = useState(true);
  const [fps, setFps] = useState(144);
  const [gpuTemp, setGpuTemp] = useState(68);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [screenshotTaken, setScreenshotTaken] = useState(false);
  const controllerList = controllers.length
    ? controllers.filter(d => d.type === 'Game Controller')
    : [
        { name: 'PlayStation 5 Controller', connected: true, battery: 85 },
        { name: 'Xbox Series Controller', connected: false, battery: 0 },
      ];

    useEffect(() => {
    const interval = setInterval(() => {
      if (!gameMode) return;

      setFps(prev => {
        const next = prev + (Math.random() - 0.5) * 15;
        return Math.max(30, Math.min(240, Math.round(next)));
      });

      setGpuTemp(prev => {
        const next = prev + (Math.random() - 0.5) * 4;
        return Math.max(40, Math.min(85, Math.round(next)));
      });

      setCpuUsage(prev => {
        const next = prev + (Math.random() - 0.5) * 12;
        return Math.max(1, Math.min(100, Math.round(next)));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameMode]);

  useEffect(() => {
    if (!screenshotTaken) return;
    const timeout = setTimeout(() => setScreenshotTaken(false), 2000);
    return () => clearTimeout(timeout);
  }, [screenshotTaken]);

  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Game Mode" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-4xl" height="h-[80vh]">
        <div className="p-6 space-y-6">
          {/* Game Mode Toggle */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-cloud-lg bg-gradient-to-br from-cloud-purple to-cloud-pink flex items-center justify-center shadow-cloud">
                  <GamepadIcon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cloud-gray-deeper dark:text-dark-text">
                    Game Mode
                  </h3>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    Optimize performance for gaming
                  </p>
                </div>
              </div>
              <Switch checked={gameMode} onChange={setGameMode} />
            </div>
          </Card>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUpIcon size={20} className="text-cloud-green" />
                <p className="text-sm font-medium text-cloud-gray-dark dark:text-dark-text-muted">
                  FPS
                </p>
              </div>
              <p className="text-3xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                {showFPS ? fps : '--'}
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <MonitorIcon size={20} className="text-cloud-blue" />
                <p className="text-sm font-medium text-cloud-gray-dark dark:text-dark-text-muted">
                  GPU Temp
                </p>
              </div>
              <p className="text-3xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                {showTemperature ? `${gpuTemp}°C` : '--'}
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <GamepadIcon size={20} className="text-cloud-purple" />
                <p className="text-sm font-medium text-cloud-gray-dark dark:text-dark-text-muted">
                  CPU Usage
                </p>
              </div>
              <p className="text-3xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                {cpuUsage}%
              </p>
            </Card>
          </div>

          {/* Controller Pairing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Controllers
            </h3>
            <div className="space-y-3">
              {controllerList.map((controller, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-cloud bg-cloud-purple/20 flex items-center justify-center">
                      <GamepadIcon size={24} className="text-cloud-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {controller.name}
                      </p>
                      <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        {bluetoothEnabled && controller.connected ? 'Connected' : 'Disconnected'}
                        {controller.battery > 0 && ` • ${controller.battery}% battery`}
                        {!bluetoothEnabled && ' • Bluetooth off'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={!bluetoothEnabled}
                    onClick={() => onToggleController && onToggleController(controller.name)}
                  >
                    {bluetoothEnabled && controller.connected ? 'Disconnect' : 'Pair'}
                  </Button>
                </div>
              ))}

            </div>
          </Card>

          {/* Recording & Streaming */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text">
                Recording & Streaming
              </h3>

              {recording && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-500 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Recording...
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant={recording ? 'danger' : 'primary'} className="w-full" onClick={() => setRecording(!recording)}>
                <VideoIcon size={20} className="mr-2" />
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setScreenshotTaken(true)}
              >
                <CameraIcon size={20} className="mr-2" />
                {screenshotTaken ? 'Screenshot Saved' : 'Screenshot'}
              </Button>


              <Button variant="secondary" className="w-full">
                <MicIcon size={20} className="mr-2" />
                Voice Chat
              </Button>

              <Button variant="secondary" className="w-full">
                <MonitorIcon size={20} className="mr-2" />
                Stream
              </Button>
            </div>
          </Card>

          {/* Display Options */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Display Options
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                    Show FPS Counter
                  </p>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    Display frame rate on screen
                  </p>
                </div>
                <Switch checked={showFPS} onChange={setShowFPS} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                    Temperature Monitor
                  </p>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    Show GPU/CPU temperature
                  </p>
                </div>
                <Switch checked={showTemperature} onChange={setShowTemperature} />
              </div>
            </div>
          </Card>
        </div>
      </Window>
      {screenshotTaken && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 px-4 py-2 rounded-cloud-lg bg-cloud-gray-deeper/90 text-white shadow-cloud">
          <CameraIcon size={18} className="opacity-90" />
          <span className="text-sm font-medium">
            Screenshot captured (simulation)
          </span>
        </div>
      )}

    </div>;
}