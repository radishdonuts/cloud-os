import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CpuIcon, MonitorIcon, MemoryStickIcon, WifiIcon, BluetoothIcon, UsbIcon, HardDriveIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon } from 'lucide-react';
export interface DeviceManagerProps {
  onClose: () => void;
}
type DeviceStatus = 'working' | 'warning' | 'error' | 'disabled';
interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  driver: string;
  details: string;
}
export function DeviceManager({
  onClose
}: DeviceManagerProps) {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showBluetoothPairing, setShowBluetoothPairing] = useState(false);
  const [devices, setDevices] = useState<Device[]>([{
    id: 'cpu',
    name: 'Intel Core i7-12700K',
    type: 'Processor',
    status: 'working',
    driver: 'CloudOS CPU Driver v2.1.0',
    details: '12 Cores (8P + 4E) • 3.6 GHz Base • 5.0 GHz Turbo'
  }, {
    id: 'gpu',
    name: 'NVIDIA RTX 4070',
    type: 'Graphics',
    status: 'working',
    driver: 'NVIDIA Driver 535.98',
    details: '12 GB GDDR6X • PCIe 4.0 x16 • 5888 CUDA Cores'
  }, {
    id: 'ram',
    name: 'DDR5 Memory',
    type: 'Memory',
    status: 'working',
    driver: 'System Memory Controller',
    details: '32 GB • 5600 MHz • Dual Channel'
  }, {
    id: 'wifi',
    name: 'Intel Wi-Fi 6E AX210',
    type: 'Network',
    status: 'working',
    driver: 'CloudOS WiFi Driver v3.2.1',
    details: 'Connected to "Home Network" • 867 Mbps'
  }, {
    id: 'bluetooth',
    name: 'Bluetooth 5.2',
    type: 'Bluetooth',
    status: 'working',
    driver: 'CloudOS Bluetooth Stack v2.0',
    details: '2 devices connected'
  }, {
    id: 'display',
    name: 'LG 27" 4K Monitor',
    type: 'Display',
    status: 'working',
    driver: 'Generic PnP Monitor',
    details: '3840 × 2160 @ 60Hz • HDR10 Support'
  }, {
    id: 'storage',
    name: 'Samsung 980 PRO',
    type: 'Storage',
    status: 'working',
    driver: 'NVMe Controller',
    details: '1 TB • PCIe 4.0 x4 • 7000 MB/s Read'
  }, {
    id: 'usb',
    name: 'USB 3.2 Controller',
    type: 'USB',
    status: 'working',
    driver: 'USB Host Controller',
    details: '4 ports • 10 Gbps per port'
  }]);
  const [updating, setUpdating] = useState(false);
  const getStatusIcon = (status: DeviceStatus) => {
    switch (status) {
      case 'working':
        return <CheckCircleIcon size={20} className="text-cloud-green" />;
      case 'warning':
        return <AlertCircleIcon size={20} className="text-yellow-500" />;
      case 'error':
        return <XCircleIcon size={20} className="text-red-500" />;
      case 'disabled':
        return <XCircleIcon size={20} className="text-cloud-gray-dark" />;
    }
  };
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Processor':
        return <CpuIcon size={32} className="text-cloud-blue" />;
      case 'Graphics':
        return <MonitorIcon size={32} className="text-cloud-purple" />;
      case 'Memory':
        return <MemoryStickIcon size={32} className="text-cloud-green" />;
      case 'Network':
        return <WifiIcon size={32} className="text-cloud-blue" />;
      case 'Bluetooth':
        return <BluetoothIcon size={32} className="text-cloud-blue" />;
      case 'Display':
        return <MonitorIcon size={32} className="text-cloud-pink" />;
      case 'Storage':
        return <HardDriveIcon size={32} className="text-cloud-purple" />;
      case 'USB':
        return <UsbIcon size={32} className="text-cloud-green" />;
      default:
        return <MonitorIcon size={32} className="text-cloud-gray-dark" />;
    }
  };
  const handleUpdateDriver = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      alert('Driver updated successfully!');
    }, 2000);
  };
  const handleDisableDevice = () => {
    if (selectedDevice) {
      setDevices(devices.map(d => d.id === selectedDevice.id ? {
        ...d,
        status: 'disabled'
      } : d));
      setSelectedDevice({
        ...selectedDevice,
        status: 'disabled'
      });
    }
  };
  const handleEnableDevice = () => {
    if (selectedDevice) {
      setDevices(devices.map(d => d.id === selectedDevice.id ? {
        ...d,
        status: 'working'
      } : d));
      setSelectedDevice({
        ...selectedDevice,
        status: 'working'
      });
    }
  };
  if (showBluetoothPairing) {
    return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
        <Window title="Bluetooth Pairing" onClose={() => setShowBluetoothPairing(false)} width="w-full max-w-2xl" height="h-auto">
          <div className="p-6 space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-cloud-xl bg-cloud-blue/20 flex items-center justify-center">
                <BluetoothIcon size={40} className="text-cloud-blue animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                Searching for devices...
              </h3>
              <p className="text-cloud-gray-dark dark:text-dark-text-muted">
                Make sure your device is in pairing mode
              </p>
            </div>

            <div className="space-y-3">
              {[{
              name: 'PlayStation 5 Controller',
              type: 'Game Controller',
              signal: 'Strong'
            }, {
              name: 'AirPods Pro',
              type: 'Audio',
              signal: 'Medium'
            }, {
              name: 'Magic Keyboard',
              type: 'Keyboard',
              signal: 'Strong'
            }].map((device, i) => <Card key={i} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-cloud bg-cloud-blue/20 flex items-center justify-center">
                        <BluetoothIcon size={24} className="text-cloud-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                          {device.name}
                        </p>
                        <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                          {device.type} • Signal: {device.signal}
                        </p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Pair
                    </Button>
                  </div>
                </Card>)}
            </div>

            <Button variant="secondary" className="w-full" onClick={() => setShowBluetoothPairing(false)}>
              Cancel
            </Button>
          </div>
        </Window>
      </div>;
  }
  if (selectedDevice) {
    return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
        <Window title={selectedDevice.name} onClose={() => setSelectedDevice(null)} width="w-full max-w-3xl" height="h-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-cloud-xl bg-cloud-blue/20 flex items-center justify-center flex-shrink-0">
                {getDeviceIcon(selectedDevice.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-cloud-gray-deeper dark:text-dark-text mb-1">
                      {selectedDevice.name}
                    </h3>
                    <p className="text-cloud-gray-dark dark:text-dark-text-muted">
                      {selectedDevice.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedDevice.status)}
                    <span className={`text-sm font-medium ${selectedDevice.status === 'working' ? 'text-cloud-green' : selectedDevice.status === 'disabled' ? 'text-cloud-gray-dark' : 'text-red-500'}`}>
                      {selectedDevice.status === 'working' ? 'Working properly' : selectedDevice.status === 'disabled' ? 'Disabled' : 'Error'}
                    </span>
                  </div>
                </div>
                <p className="text-cloud-gray-dark dark:text-dark-text-muted">
                  {selectedDevice.details}
                </p>
              </div>
            </div>

            <Card className="p-6">
              <h4 className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                Driver Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark dark:text-dark-text-muted">
                    Driver
                  </span>
                  <span className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                    {selectedDevice.driver}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark dark:text-dark-text-muted">
                    Status
                  </span>
                  <span className="font-medium text-cloud-green">
                    {updating ? 'Updating...' : 'Up to date'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cloud-gray-dark dark:text-dark-text-muted">
                    Last Updated
                  </span>
                  <span className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                    2 days ago
                  </span>
                </div>
              </div>
            </Card>

            {selectedDevice.type === 'Bluetooth' && <Card className="p-6">
                <h4 className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                  Connected Devices
                </h4>
                <div className="space-y-3">
                  {['PlayStation 5 Controller', 'AirPods Pro'].map((device, i) => <div key={i} className="flex items-center justify-between p-3 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg">
                        <span className="text-cloud-gray-deeper dark:text-dark-text">
                          {device}
                        </span>
                        <Button variant="ghost" size="sm">
                          Disconnect
                        </Button>
                      </div>)}
                </div>
                <Button variant="primary" className="w-full mt-4" onClick={() => {
              setSelectedDevice(null);
              setShowBluetoothPairing(true);
            }}>
                  Add New Device
                </Button>
              </Card>}

            <div className="flex gap-3">
              <Button variant="primary" className="flex-1" onClick={handleUpdateDriver} disabled={updating}>
                {updating ? 'Updating...' : 'Update Driver'}
              </Button>
              {selectedDevice.status === 'disabled' ? <Button variant="secondary" className="flex-1" onClick={handleEnableDevice}>
                  Enable Device
                </Button> : <Button variant="secondary" className="flex-1" onClick={handleDisableDevice}>
                  Disable Device
                </Button>}
              <Button variant="ghost" onClick={() => setSelectedDevice(null)}>
                Close
              </Button>
            </div>
          </div>
        </Window>
      </div>;
  }
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Device Manager" onClose={onClose} width="w-full max-w-5xl" height="h-[85vh]">
        <div className="p-6 space-y-6 overflow-auto h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                Hardware Devices
              </h2>
              <p className="text-cloud-gray-dark dark:text-dark-text-muted">
                Manage your system hardware and drivers
              </p>
            </div>
            <Button variant="secondary" onClick={() => setShowBluetoothPairing(true)}>
              <BluetoothIcon size={18} className="mr-2" />
              Pair Bluetooth Device
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {devices.map(device => <Card key={device.id} hover className="p-6 cursor-pointer" onClick={() => setSelectedDevice(device)}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-cloud-lg bg-cloud-blue/20 flex items-center justify-center flex-shrink-0">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-cloud-gray-deeper dark:text-dark-text truncate">
                          {device.name}
                        </h3>
                        <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                          {device.type}
                        </p>
                      </div>
                      {getStatusIcon(device.status)}
                    </div>
                    <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted line-clamp-2">
                      {device.details}
                    </p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </Window>
    </div>;
}