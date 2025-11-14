import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Switch';
import { CloudIcon } from '../components/ui/CloudIcon';
import { CpuIcon, HardDriveIcon, MemoryStickIcon, MonitorIcon, ShieldIcon, ActivityIcon } from 'lucide-react';
export function BIOSScreen({
  onContinue
}: {
  onContinue: () => void;
}) {
  const [activeTab, setActiveTab] = useState('system');
  const [virtualization, setVirtualization] = useState(true);
  const [secureBoot, setSecureBoot] = useState(true);
  const [fastBoot, setFastBoot] = useState(false);
  const tabs = [{
    id: 'system',
    label: 'System Info',
    icon: MonitorIcon
  }, {
    id: 'boot',
    label: 'Boot Order',
    icon: HardDriveIcon
  }, {
    id: 'virtualization',
    label: 'Virtualization',
    icon: CpuIcon
  }, {
    id: 'security',
    label: 'Security',
    icon: ShieldIcon
  }, {
    id: 'diagnostics',
    label: 'Diagnostics',
    icon: ActivityIcon
  }];
  return <div className="w-full min-h-screen bg-gradient-to-br from-cloud-cream via-cloud-gray to-cloud-green/20 p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <CloudIcon size={48} animated />
          <div>
            <h1 className="text-3xl font-bold text-cloud-gray-deeper">
              CloudOS Firmware
            </h1>
            <p className="text-cloud-gray-dark">Version 2.0.1</p>
          </div>
        </div>
        <div className="text-right text-sm text-cloud-gray-dark">
          <p>Press F2 for Setup</p>
          <p>Press F12 for Boot Menu</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => {
        const Icon = tab.icon;
        return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`
                flex items-center gap-2 px-6 py-3 rounded-cloud-lg font-medium transition-all duration-200
                ${activeTab === tab.id ? 'bg-white shadow-cloud text-cloud-green' : 'bg-white/40 text-cloud-gray-dark hover:bg-white/60'}
              `}>
              <Icon size={18} />
              {tab.label}
            </button>;
      })}
      </div>

      {/* Content */}
      <div className="flex-1 mb-6">
        {activeTab === 'system' && <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-cloud bg-cloud-green/20 flex items-center justify-center">
                  <CpuIcon size={24} className="text-cloud-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-cloud-gray-deeper">
                    Processor
                  </h3>
                  <p className="text-sm text-cloud-gray-dark">
                    Intel Core i7-12700K
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Cores</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    12 (8P + 4E)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Base Clock</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    3.6 GHz
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Max Turbo</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    5.0 GHz
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-cloud bg-cloud-blue/20 flex items-center justify-center">
                  <MemoryStickIcon size={24} className="text-cloud-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-cloud-gray-deeper">
                    Memory
                  </h3>
                  <p className="text-sm text-cloud-gray-dark">32 GB DDR5</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Speed</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    5600 MHz
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Slots Used</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    2 of 4
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Dual Channel</span>
                  <span className="font-medium text-cloud-green">Enabled</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-cloud bg-cloud-purple/20 flex items-center justify-center">
                  <MonitorIcon size={24} className="text-cloud-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-cloud-gray-deeper">
                    Graphics
                  </h3>
                  <p className="text-sm text-cloud-gray-dark">
                    NVIDIA RTX 4070
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">VRAM</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    12 GB GDDR6X
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">PCIe</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    Gen 4 x16
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-cloud bg-cloud-pink/20 flex items-center justify-center">
                  <HardDriveIcon size={24} className="text-cloud-pink" />
                </div>
                <div>
                  <h3 className="font-semibold text-cloud-gray-deeper">
                    Storage
                  </h3>
                  <p className="text-sm text-cloud-gray-dark">1 TB NVMe SSD</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Interface</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    PCIe 4.0 x4
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Read Speed</span>
                  <span className="font-medium text-cloud-gray-deeper">
                    7000 MB/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark">Health</span>
                  <span className="font-medium text-cloud-green">
                    Excellent
                  </span>
                </div>
              </div>
            </Card>
          </div>}

        {activeTab === 'boot' && <Card className="p-8">
            <h3 className="text-xl font-semibold text-cloud-gray-deeper mb-6">
              Boot Priority Order
            </h3>
            <div className="space-y-4">
              {[{
            name: 'CloudOS (NVMe Drive)',
            icon: '💿',
            primary: true
          }, {
            name: 'CloudOS Recovery',
            icon: '🔧',
            primary: false
          }, {
            name: 'USB Drive',
            icon: '🔌',
            primary: false
          }, {
            name: 'Network Boot',
            icon: '🌐',
            primary: false
          }].map((device, index) => <div key={index} className={`
                    flex items-center justify-between p-4 rounded-cloud-lg
                    ${device.primary ? 'bg-cloud-green/10 border-2 border-cloud-green' : 'bg-cloud-gray/20 border-2 border-transparent'}
                  `}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{device.icon}</span>
                    <div>
                      <p className="font-medium text-cloud-gray-deeper">
                        {device.name}
                      </p>
                      <p className="text-sm text-cloud-gray-dark">
                        Boot Priority: {index + 1}
                      </p>
                    </div>
                  </div>
                  {device.primary && <span className="px-3 py-1 bg-cloud-green text-white text-sm rounded-full">
                      Primary
                    </span>}
                </div>)}
            </div>
          </Card>}

        {activeTab === 'virtualization' && <Card className="p-8">
            <h3 className="text-xl font-semibold text-cloud-gray-deeper mb-6">
              Virtualization Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                <div>
                  <h4 className="font-medium text-cloud-gray-deeper">
                    Intel VT-x / AMD-V
                  </h4>
                  <p className="text-sm text-cloud-gray-dark">
                    Hardware virtualization support
                  </p>
                </div>
                <Switch checked={virtualization} onChange={setVirtualization} />
              </div>
              <div className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                <div>
                  <h4 className="font-medium text-cloud-gray-deeper">
                    VT-d / AMD-Vi
                  </h4>
                  <p className="text-sm text-cloud-gray-dark">
                    I/O virtualization for direct device access
                  </p>
                </div>
                <Switch checked={true} onChange={() => {}} />
              </div>
            </div>
          </Card>}

        {activeTab === 'security' && <Card className="p-8">
            <h3 className="text-xl font-semibold text-cloud-gray-deeper mb-6">
              Security Features
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                <div>
                  <h4 className="font-medium text-cloud-gray-deeper">
                    Secure Boot
                  </h4>
                  <p className="text-sm text-cloud-gray-dark">
                    Verify bootloader signatures
                  </p>
                </div>
                <Switch checked={secureBoot} onChange={setSecureBoot} />
              </div>
              <div className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                <div>
                  <h4 className="font-medium text-cloud-gray-deeper">
                    TPM 2.0
                  </h4>
                  <p className="text-sm text-cloud-gray-dark">
                    Trusted Platform Module
                  </p>
                </div>
                <Switch checked={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                <div>
                  <h4 className="font-medium text-cloud-gray-deeper">
                    Fast Boot
                  </h4>
                  <p className="text-sm text-cloud-gray-dark">
                    Skip hardware checks for faster startup
                  </p>
                </div>
                <Switch checked={fastBoot} onChange={setFastBoot} />
              </div>
            </div>
          </Card>}

        {activeTab === 'diagnostics' && <Card className="p-8">
            <h3 className="text-xl font-semibold text-cloud-gray-deeper mb-6">
              System Diagnostics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[{
            label: 'CPU Test',
            status: 'Passed',
            color: 'text-cloud-green'
          }, {
            label: 'Memory Test',
            status: 'Passed',
            color: 'text-cloud-green'
          }, {
            label: 'Storage Test',
            status: 'Passed',
            color: 'text-cloud-green'
          }, {
            label: 'Graphics Test',
            status: 'Passed',
            color: 'text-cloud-green'
          }, {
            label: 'Network Test',
            status: 'Passed',
            color: 'text-cloud-green'
          }, {
            label: 'USB Ports',
            status: 'Passed',
            color: 'text-cloud-green'
          }].map((test, index) => <div key={index} className="flex items-center justify-between p-4 bg-cloud-gray/10 rounded-cloud-lg">
                  <span className="font-medium text-cloud-gray-deeper">
                    {test.label}
                  </span>
                  <span className={`font-semibold ${test.color}`}>
                    {test.status}
                  </span>
                </div>)}
            </div>
            <Button variant="secondary" className="w-full mt-6">
              Run Full Diagnostic
            </Button>
          </Card>}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button variant="secondary">Load Defaults</Button>
          <Button variant="secondary">Save & Exit</Button>
        </div>
        <Button variant="primary" onClick={onContinue} className="px-12">
          Continue to CloudOS
        </Button>
      </div>
    </div>;
}