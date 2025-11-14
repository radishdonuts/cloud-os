import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';
import { GamepadIcon, MonitorIcon, MicIcon, VideoIcon, CameraIcon, TrendingUpIcon } from 'lucide-react';
export interface GameModeProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
}
export function GameMode({
  onClose,
  onMinimize,
  onMaximize,
  maximized = false
}: GameModeProps) {
  const [gameMode, setGameMode] = useState(true);
  const [recording, setRecording] = useState(false);
  const [showFPS, setShowFPS] = useState(true);
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Game Mode" onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} maximized={maximized} width="w-full max-w-4xl" height="h-[80vh]">
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
                144
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
                68°C
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
                42%
              </p>
            </Card>
          </div>

          {/* Controller Pairing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Controllers
            </h3>
            <div className="space-y-3">
              {[{
              name: 'PlayStation 5 Controller',
              status: 'Connected',
              battery: 85
            }, {
              name: 'Xbox Series Controller',
              status: 'Disconnected',
              battery: 0
            }].map((controller, i) => <div key={i} className="flex items-center justify-between p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-cloud bg-cloud-purple/20 flex items-center justify-center">
                      <GamepadIcon size={24} className="text-cloud-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {controller.name}
                      </p>
                      <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        {controller.status}
                        {controller.battery > 0 && ` • ${controller.battery}% battery`}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    {controller.status === 'Connected' ? 'Disconnect' : 'Pair'}
                  </Button>
                </div>)}
            </div>
          </Card>

          {/* Recording & Streaming */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Recording & Streaming
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant={recording ? 'danger' : 'primary'} className="w-full" onClick={() => setRecording(!recording)}>
                <VideoIcon size={20} className="mr-2" />
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>

              <Button variant="secondary" className="w-full">
                <CameraIcon size={20} className="mr-2" />
                Screenshot
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
                <Switch checked={true} onChange={() => {}} />
              </div>
            </div>
          </Card>
        </div>
      </Window>
    </div>;
}