import React, { useEffect, useState, memo } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CpuIcon, MemoryStickIcon, HardDriveIcon, WifiIcon, XIcon, PauseIcon, PlayIcon } from 'lucide-react';
export interface ProcessManagerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}
interface Process {
  id: string;
  name: string;
  icon: string;
  cpu: number;
  memory: number;
  status: 'running' | 'paused';
}
export function ProcessManager({
  onClose,
  onMaximize,
  maximized = false,
  zIndex = 40
}: ProcessManagerProps) {
  const [processes, setProcesses] = useState<Process[]>([{
    id: '1',
    name: 'CloudOS System',
    icon: '☁️',
    cpu: 8,
    memory: 1.2,
    status: 'running'
  }, {
    id: '2',
    name: 'File Manager',
    icon: '📁',
    cpu: 2,
    memory: 0.4,
    status: 'running'
  }, {
    id: '3',
    name: 'Web Browser',
    icon: '🌐',
    cpu: 35,
    memory: 3.8,
    status: 'running'
  }, {
    id: '4',
    name: 'Music Player',
    icon: '🎵',
    cpu: 5,
    memory: 0.9,
    status: 'running'
  }, {
    id: '5',
    name: 'Code Editor',
    icon: '💻',
    cpu: 18,
    memory: 2.1,
    status: 'running'
  }, {
    id: '6',
    name: 'Background Sync',
    icon: '🔄',
    cpu: 1,
    memory: 0.2,
    status: 'running'
  }]);
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(60).fill(0).map(() => Math.random() * 100));
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory(prev => {
        const newHistory = [...prev.slice(1), Math.random() * 100];
        return newHistory;
      });
      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu: p.status === 'running' ? Math.max(1, p.cpu + (Math.random() - 0.5) * 10) : 0
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handlePause = (id: string) => {
    setProcesses(processes.map(p => p.id === id ? {
      ...p,
      status: 'paused' as const,
      cpu: 0
    } : p));
  };
  const handleResume = (id: string) => {
    setProcesses(processes.map(p => p.id === id ? {
      ...p,
      status: 'running' as const
    } : p));
  };
  const handleEnd = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id));
  };
  const totalCpu = processes.reduce((sum, p) => sum + p.cpu, 0);
  const totalMemory = processes.reduce((sum, p) => sum + p.memory, 0);
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Process Manager" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-5xl" height="h-[80vh]">
        <div className="p-6 space-y-6">
          {/* Resource Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-cloud bg-cloud-blue/20 flex items-center justify-center">
                  <CpuIcon size={20} className="text-cloud-blue" />
                </div>
                <div>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    CPU
                  </p>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    {Math.round(totalCpu)}%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                <div className="h-full bg-cloud-blue rounded-full transition-all duration-300" style={{
                width: `${Math.min(100, totalCpu)}%`
              }} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-cloud bg-cloud-green/20 flex items-center justify-center">
                  <MemoryStickIcon size={20} className="text-cloud-green" />
                </div>
                <div>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    Memory
                  </p>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    {totalMemory.toFixed(1)} GB
                  </p>
                </div>
              </div>
              <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                <div className="h-full bg-cloud-green rounded-full" style={{
                width: `${totalMemory / 16 * 100}%`
              }} />
              </div>
              <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted mt-1">
                of 16 GB
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-cloud bg-cloud-purple/20 flex items-center justify-center">
                  <HardDriveIcon size={20} className="text-cloud-purple" />
                </div>
                <div>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    Disk
                  </p>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    12%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                <div className="h-full bg-cloud-purple rounded-full" style={{
                width: '12%'
              }} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-cloud bg-cloud-pink/20 flex items-center justify-center">
                  <WifiIcon size={20} className="text-cloud-pink" />
                </div>
                <div>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    Network
                  </p>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    18 Mbps
                  </p>
                </div>
              </div>
              <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                ↓ 15 Mbps • ↑ 3 Mbps
              </p>
            </Card>
          </div>

          {/* Process List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Active Processes ({processes.length})
            </h3>
            <div className="space-y-3">
              {processes.map(process => <div key={process.id} className="flex items-center gap-4 p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors">
                  <span className="text-3xl">{process.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {process.name}
                      </p>
                      {process.status === 'paused' && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-600 text-xs font-medium rounded-full">
                          Paused
                        </span>}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        CPU: {Math.round(process.cpu)}%
                      </span>
                      <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        Memory: {process.memory.toFixed(1)} GB
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {process.status === 'running' ? <button onClick={() => handlePause(process.id)} className="p-2 hover:bg-yellow-500/20 rounded-cloud transition-colors" title="Pause">
                        <PauseIcon size={18} className="text-yellow-600" />
                      </button> : <button onClick={() => handleResume(process.id)} className="p-2 hover:bg-cloud-green/20 rounded-cloud transition-colors" title="Resume">
                        <PlayIcon size={18} className="text-cloud-green" />
                      </button>}
                    <button onClick={() => handleEnd(process.id)} className="p-2 hover:bg-red-500/20 rounded-cloud transition-colors" title="End Task">
                      <XIcon size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>)}
            </div>
          </Card>

          {/* Resource Graph */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              CPU Usage Timeline
            </h3>
            <div className="h-32 flex items-end gap-1">
              {cpuHistory.map((height, i) => <div key={i} className="flex-1 bg-gradient-to-t from-cloud-green to-cloud-blue rounded-t-cloud transition-all duration-300" style={{
              height: `${height}%`
            }} />)}
            </div>
          </Card>
        </div>
      </Window>
    </div>;
}