import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { CloudIcon } from '../components/ui/CloudIcon';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
type Step = 'welcome' | 'name' | 'avatar' | 'password' | 'cloud' | 'theme' | 'complete';
export function AccountCreation({
  onComplete
}: {
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cloudSync, setCloudSync] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'pastel'>('light');
  const steps: Step[] = ['welcome', 'name', 'avatar', 'password', 'cloud', 'theme', 'complete'];
  const currentStepIndex = steps.indexOf(step);
  const progress = (currentStepIndex + 1) / steps.length * 100;
  const avatarOptions = [{
    color: 'from-cloud-green to-cloud-blue',
    icon: '🌟'
  }, {
    color: 'from-cloud-purple to-cloud-pink',
    icon: '🎨'
  }, {
    color: 'from-cloud-blue to-cloud-green',
    icon: '🚀'
  }, {
    color: 'from-cloud-pink to-cloud-purple',
    icon: '🎭'
  }, {
    color: 'from-cloud-green to-cloud-green-dark',
    icon: '🌿'
  }, {
    color: 'from-cloud-blue to-cloud-purple',
    icon: '⚡'
  }];
  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };
  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };
  return <div className="w-full min-h-screen bg-gradient-to-br from-cloud-cream via-cloud-green/20 to-cloud-blue/20 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => <div key={i} className="absolute opacity-10" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${10 + Math.random() * 5}s ease-in-out infinite`
      }}>
            <CloudIcon size={60 + Math.random() * 60} />
          </div>)}
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg p-8 border border-cloud-gray/20">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => <div key={s} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                    ${i <= currentStepIndex ? 'bg-cloud-green text-white shadow-glow' : 'bg-cloud-gray text-cloud-gray-dark'}
                  `}>
                    {i < currentStepIndex ? <CheckIcon size={16} /> : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className={`
                      w-12 h-1 mx-2 rounded-full transition-all duration-300
                      ${i < currentStepIndex ? 'bg-cloud-green' : 'bg-cloud-gray'}
                    `} />}
                </div>)}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[400px] flex flex-col justify-between">
            {step === 'welcome' && <div className="text-center animate-fade-in">
                <CloudIcon size={100} className="mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-cloud-gray-deeper mb-4">
                  Welcome to CloudOS
                </h1>
                <p className="text-lg text-cloud-gray-dark mb-8">
                  Let's set up your cloud experience in just a few steps
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {['☁️ Cloud Storage', '🎨 Personalization', '🔒 Secure'].map((feature, i) => <div key={i} className="p-4 bg-cloud-gray/20 rounded-cloud-lg">
                        <p className="text-2xl mb-2">{feature.split(' ')[0]}</p>
                        <p className="text-sm text-cloud-gray-dark">
                          {feature.split(' ').slice(1).join(' ')}
                        </p>
                      </div>)}
                </div>
              </div>}

            {step === 'name' && <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-2">
                  What's your name?
                </h2>
                <p className="text-cloud-gray-dark mb-8">
                  This will be displayed on your profile
                </p>
                <Input label="Full Name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="text-lg" />
              </div>}

            {step === 'avatar' && <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-2">
                  Choose your avatar
                </h2>
                <p className="text-cloud-gray-dark mb-8">
                  Pick a style that represents you
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {avatarOptions.map((avatar, i) => <button key={i} onClick={() => setSelectedAvatar(i)} className={`
                        relative p-6 rounded-cloud-xl transition-all duration-200
                        ${selectedAvatar === i ? 'bg-cloud-green/20 border-2 border-cloud-green shadow-glow scale-105' : 'bg-cloud-gray/20 border-2 border-transparent hover:scale-105'}
                      `}>
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-4xl shadow-cloud`}>
                        {avatar.icon}
                      </div>
                      {selectedAvatar === i && <div className="absolute top-2 right-2 w-6 h-6 bg-cloud-green rounded-full flex items-center justify-center">
                          <CheckIcon size={14} className="text-white" />
                        </div>}
                    </button>)}
                </div>
              </div>}

            {step === 'password' && <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-2">
                  Create a password
                </h2>
                <p className="text-cloud-gray-dark mb-8">
                  Keep your account secure
                </p>
                <div className="space-y-4">
                  <Input type="password" label="Password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                  <Input type="password" label="Confirm Password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  <div className="flex gap-2 text-sm">
                    <div className={`flex-1 h-1 rounded-full ${password.length >= 8 ? 'bg-cloud-green' : 'bg-cloud-gray'}`} />
                    <div className={`flex-1 h-1 rounded-full ${/[A-Z]/.test(password) ? 'bg-cloud-green' : 'bg-cloud-gray'}`} />
                    <div className={`flex-1 h-1 rounded-full ${/[0-9]/.test(password) ? 'bg-cloud-green' : 'bg-cloud-gray'}`} />
                  </div>
                  <p className="text-xs text-cloud-gray-dark">
                    Password must be at least 8 characters with uppercase and
                    numbers
                  </p>
                </div>
              </div>}

            {step === 'cloud' && <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-2">
                  Sync with Cloud?
                </h2>
                <p className="text-cloud-gray-dark mb-8">
                  Access your files from anywhere
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setCloudSync(true)} className={`
                      p-6 rounded-cloud-xl transition-all duration-200
                      ${cloudSync ? 'bg-cloud-green/20 border-2 border-cloud-green shadow-glow' : 'bg-cloud-gray/20 border-2 border-transparent hover:bg-cloud-gray/30'}
                    `}>
                    <div className="text-4xl mb-3">☁️</div>
                    <h3 className="font-semibold text-cloud-gray-deeper mb-1">
                      Enable Sync
                    </h3>
                    <p className="text-sm text-cloud-gray-dark">
                      Backup and sync your data
                    </p>
                  </button>
                  <button onClick={() => setCloudSync(false)} className={`
                      p-6 rounded-cloud-xl transition-all duration-200
                      ${!cloudSync ? 'bg-cloud-green/20 border-2 border-cloud-green shadow-glow' : 'bg-cloud-gray/20 border-2 border-transparent hover:bg-cloud-gray/30'}
                    `}>
                    <div className="text-4xl mb-3">💾</div>
                    <h3 className="font-semibold text-cloud-gray-deeper mb-1">
                      Local Only
                    </h3>
                    <p className="text-sm text-cloud-gray-dark">
                      Keep data on this device
                    </p>
                  </button>
                </div>
              </div>}

            {step === 'theme' && <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-2">
                  Choose your theme
                </h2>
                <p className="text-cloud-gray-dark mb-8">
                  Customize your CloudOS experience
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[{
                id: 'light',
                name: 'Light',
                colors: ['#FFF9F0', '#A8D5BA', '#E8EBF0']
              }, {
                id: 'dark',
                name: 'Dark',
                colors: ['#1A1D23', '#7FB89E', '#2C3038']
              }, {
                id: 'pastel',
                name: 'Pastel',
                colors: ['#FFF9F0', '#C5B8E0', '#E0B8D5']
              }].map(t => <button key={t.id} onClick={() => setTheme(t.id as any)} className={`
                        p-4 rounded-cloud-xl transition-all duration-200
                        ${theme === t.id ? 'border-2 border-cloud-green shadow-glow scale-105' : 'border-2 border-transparent hover:scale-105'}
                      `}>
                      <div className="flex gap-2 mb-3">
                        {t.colors.map((color, i) => <div key={i} className="flex-1 h-12 rounded-cloud" style={{
                    backgroundColor: color
                  }} />)}
                      </div>
                      <p className="font-semibold text-cloud-gray-deeper">
                        {t.name}
                      </p>
                    </button>)}
                </div>
              </div>}

            {step === 'complete' && <div className="text-center animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 bg-cloud-green rounded-full flex items-center justify-center shadow-glow">
                  <CheckIcon size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-cloud-gray-deeper mb-4">
                  Your CloudOS profile is ready!
                </h2>
                <p className="text-lg text-cloud-gray-dark mb-8">
                  Welcome to your new cloud experience, {name}
                </p>
                <div className="flex justify-center mb-8">
                  <Avatar size="xl" fallback={name.split(' ').map(n => n[0]).join('')} />
                </div>
              </div>}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-cloud-gray/20">
              <Button variant="ghost" onClick={prevStep} disabled={step === 'welcome'} className="gap-2">
                <ChevronLeftIcon size={20} />
                Back
              </Button>

              {step === 'complete' ? <Button variant="primary" onClick={onComplete} className="gap-2">
                  Get Started
                  <ChevronRightIcon size={20} />
                </Button> : <Button variant="primary" onClick={nextStep} className="gap-2">
                  Continue
                  <ChevronRightIcon size={20} />
                </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
}