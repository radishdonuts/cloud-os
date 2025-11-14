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
  return <div className="w-full min-h-screen bg-gradient-to-br from-cloud-cream via-cloud-green/10 to-cloud-blue/10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => <div key={i} className="absolute opacity-20" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }}>
            <CloudIcon size={80 + Math.random() * 40} />
          </div>)}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="mb-8 animate-glow">
          <CloudIcon size={120} animated />
        </div>

        <h1 className="text-5xl font-bold text-cloud-gray-deeper mb-2">
          CloudOS
        </h1>
        <p className="text-xl text-cloud-gray-dark mb-12">
          Starting your cloud experience...
        </p>

        <ProgressRing progress={progress} size={140} strokeWidth={10} />

        <div className="mt-8 flex items-center gap-2">
          <div className="w-2 h-2 bg-cloud-green rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-cloud-green rounded-full animate-pulse" style={{
          animationDelay: '0.2s'
        }} />
          <div className="w-2 h-2 bg-cloud-green rounded-full animate-pulse" style={{
          animationDelay: '0.4s'
        }} />
        </div>
      </div>
    </div>;
}