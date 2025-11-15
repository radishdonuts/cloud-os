import React, { useState, memo } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { MemoryStickIcon, AlertCircleIcon, CheckCircleIcon, TrendingUpIcon } from 'lucide-react';
export interface MemoryManagerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}
export function MemoryManager({
  onClose,
  onMaximize,
  maximized = false,
  zIndex = 40
}: MemoryManagerProps) {
  const [optimizing, setOptimizing] = useState(false);
  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => setOptimizing(false), 2000);
  };
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Memory Manager" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-4xl" height="h-[80vh]">
        <div className="p-6 space-y-6">
          {/* Memory Overview */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-1 p-6 flex flex-col items-center justify-center">
              <ProgressRing progress={54} size={160} strokeWidth={12} />
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mt-4">
                8.6 GB of 16 GB used
              </p>
            </Card>

            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                Memory Breakdown
              </h3>
              <div className="space-y-4">
                {[{
                label: 'Applications',
                value: 4.2,
                color: 'bg-cloud-green',
                percent: 26
              }, {
                label: 'System',
                value: 2.1,
                color: 'bg-cloud-blue',
                percent: 13
              }, {
                label: 'Cached',
                value: 1.8,
                color: 'bg-cloud-purple',
                percent: 11
              }, {
                label: 'Available',
                value: 7.9,
                color: 'bg-cloud-gray',
                percent: 50
              }].map((item, i) => <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {item.label}
                      </span>
                      <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        {item.value} GB ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{
                    width: `${item.percent}%`
                  }} />
                    </div>
                  </div>)}
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Recommendations
            </h3>
            <div className="space-y-3">
              {[{
              type: 'warning',
              message: 'Web Browser is using 3.8 GB of memory',
              action: 'Close unused tabs'
            }, {
              type: 'info',
              message: '1.2 GB of cached data can be cleared',
              action: 'Clear cache'
            }, {
              type: 'success',
              message: 'Memory pressure is normal',
              action: null
            }].map((rec, i) => <div key={i} className={`
                    flex items-center justify-between p-4 rounded-cloud-lg
                    ${rec.type === 'warning' ? 'bg-yellow-500/10' : rec.type === 'info' ? 'bg-cloud-blue/10' : 'bg-cloud-green/10'}
                  `}>
                  <div className="flex items-center gap-3">
                    {rec.type === 'warning' ? <AlertCircleIcon size={20} className="text-yellow-600" /> : rec.type === 'info' ? <TrendingUpIcon size={20} className="text-cloud-blue" /> : <CheckCircleIcon size={20} className="text-cloud-green" />}
                    <p className="text-sm text-cloud-gray-deeper dark:text-dark-text">
                      {rec.message}
                    </p>
                  </div>
                  {rec.action && <Button variant="secondary" size="sm">
                      {rec.action}
                    </Button>}
                </div>)}
            </div>
          </Card>

          {/* Memory Pressure Graph */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Memory Pressure (Last Hour)
            </h3>
            <div className="h-32 flex items-end gap-1">
              {[...Array(60)].map((_, i) => {
              const height = 30 + Math.random() * 40;
              const color = height > 60 ? 'bg-red-400' : height > 50 ? 'bg-yellow-400' : 'bg-cloud-green';
              return <div key={i} className={`flex-1 ${color} rounded-t-cloud transition-all duration-300`} style={{
                height: `${height}%`
              }} />;
            })}
            </div>
          </Card>

          {/* Optimize Button */}
          <Button variant="primary" className="w-full" onClick={handleOptimize} disabled={optimizing}>
            {optimizing ? 'Optimizing Memory...' : 'Optimize Memory'}
          </Button>
        </div>
      </Window>
    </div>;
}