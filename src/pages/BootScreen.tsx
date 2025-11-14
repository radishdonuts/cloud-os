import React, { useEffect, useState } from 'react';
import { CloudIcon } from '../components/ui/CloudIcon';
import { ProgressRing } from '../components/ui/ProgressRing';
export function BootScreen({
  onComplete
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);
  return <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="flex flex-col items-center animate-fade-in">
        <div className="mb-6">
          <CloudIcon size={80} />
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 mb-12">
          CloudOS
        </h1>

        <ProgressRing progress={progress} size={120} strokeWidth={8} />
      </div>
    </div>;
}