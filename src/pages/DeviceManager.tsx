import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { ChevronRightIcon, ChevronDownIcon, Volume2Icon, BluetoothIcon, CameraIcon, MonitorIcon, HardDriveIcon, CpuIcon, KeyboardIcon, MouseIcon, WifiIcon, PrinterIcon, ShieldIcon, BoxIcon, CircuitBoardIcon, BatteryIcon, UsbIcon, FileTextIcon } from 'lucide-react';

export interface DeviceManagerProps {
  onClose: () => void;
}

interface DeviceCategory {
  id: string;
  name: string;
  icon: any;
  devices: string[];
  expanded: boolean;
}

export function DeviceManager({ onClose }: DeviceManagerProps) {
  const [categories, setCategories] = useState<DeviceCategory[]>([
    {
      id: 'audio',
      name: 'Audio inputs and outputs',
      icon: Volume2Icon,
      devices: [
        'Realtek High Definition Audio',
        'NVIDIA High Definition Audio',
        'Microphone (USB Audio Device)'
      ],
      expanded: false
    },
    {
      id: 'batteries',
      name: 'Batteries',
      icon: BatteryIcon,
      devices: ['Microsoft ACPI-Compliant Control Method Battery'],
      expanded: false
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth',
      icon: BluetoothIcon,
      devices: [
        'Intel(R) Wireless Bluetooth(R)',
        'Microsoft Bluetooth Enumerator'
      ],
      expanded: false
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: CameraIcon,
      devices: ['Integrated Camera', 'USB Camera Device'],
      expanded: false
    },
    {
      id: 'computer',
      name: 'Computer',
      icon: MonitorIcon,
      devices: ['ACPI x64-based PC'],
      expanded: false
    },
    {
      id: 'disk',
      name: 'Disk drives',
      icon: HardDriveIcon,
      devices: [
        'Samsung SSD 980 PRO 1TB',
        'WDC WD10EZEX-08WN4A0',
        'Kingston DataTraveler 3.0 USB Device'
      ],
      expanded: false
    },
    {
      id: 'display',
      name: 'Display adapters',
      icon: MonitorIcon,
      devices: [
        'NVIDIA GeForce RTX 4070',
        'Intel(R) UHD Graphics 770',
        'Microsoft Basic Display Adapter'
      ],
      expanded: false
    },
    {
      id: 'firmware',
      name: 'Firmware',
      icon: CircuitBoardIcon,
      devices: [
        'ASUS TUF Gaming A16 UEFI',
        'PRHidDrv10 PS883008 Peripheral Driver',
        'PS8830 Firmware Driver',
        'PS8830OA Peripheral Driver',
        'PS8830OF Peripheral Driver',
        'PS883011 Peripheral Driver'
      ],
      expanded: true
    },
    {
      id: 'hid',
      name: 'Human Interface Devices',
      icon: MouseIcon,
      devices: [
        'HID-compliant consumer control device',
        'HID-compliant game controller',
        'HID-compliant system controller',
        'USB Input Device'
      ],
      expanded: false
    },
    {
      id: 'keyboard',
      name: 'Keyboards',
      icon: KeyboardIcon,
      devices: [
        'Standard PS/2 Keyboard',
        'HID Keyboard Device'
      ],
      expanded: false
    },
    {
      id: 'mouse',
      name: 'Mice and other pointing devices',
      icon: MouseIcon,
      devices: [
        'HID-compliant mouse',
        'Logitech MX Master 3',
        'Synaptics PS/2 Port TouchPad'
      ],
      expanded: false
    },
    {
      id: 'monitors',
      name: 'Monitors',
      icon: MonitorIcon,
      devices: [
        'Generic PnP Monitor',
        'LG Ultra HD'
      ],
      expanded: false
    },
    {
      id: 'network',
      name: 'Network adapters',
      icon: WifiIcon,
      devices: [
        'Intel(R) Wi-Fi 6E AX210 160MHz',
        'Realtek PCIe GbE Family Controller',
        'Microsoft Wi-Fi Direct Virtual Adapter'
      ],
      expanded: false
    },
    {
      id: 'print',
      name: 'Print queues',
      icon: PrinterIcon,
      devices: [
        'Microsoft Print to PDF',
        'Microsoft XPS Document Writer'
      ],
      expanded: false
    },
    {
      id: 'processors',
      name: 'Processors',
      icon: CpuIcon,
      devices: [
        'Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz',
        'Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz',
        'Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz',
        'Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz'
      ],
      expanded: false
    },
    {
      id: 'security',
      name: 'Security devices',
      icon: ShieldIcon,
      devices: [
        'Trusted Platform Module 2.0',
        'Windows Hello Face Software Device'
      ],
      expanded: false
    },
    {
      id: 'software',
      name: 'Software components',
      icon: FileTextIcon,
      devices: [
        'Intel(R) Management Engine Components',
        'Microsoft Device Association Root Enumerator'
      ],
      expanded: false
    },
    {
      id: 'storage',
      name: 'Storage controllers',
      icon: HardDriveIcon,
      devices: [
        'Standard NVM Express Controller',
        'Standard SATA AHCI Controller',
        'Intel(R) Volume Management Device'
      ],
      expanded: false
    },
    {
      id: 'system',
      name: 'System devices',
      icon: BoxIcon,
      devices: [
        'ACPI Lid',
        'ACPI Processor Container',
        'ACPI Thermal Zone',
        'ACSEHIDRemap Device',
        'ACSEVirtualBus Device',
        'AMD Audio CoProcessor',
        'AMD Crash Defender',
        'AMD GPIO Controller',
        'AMD High Definition Audio Controller',
        'AMD I2C Controller'
      ],
      expanded: true
    },
    {
      id: 'usb',
      name: 'Universal Serial Bus controllers',
      icon: UsbIcon,
      devices: [
        'Intel(R) USB 3.2 eXtensible Host Controller - 1.20 (Microsoft)',
        'USB Root Hub (USB 3.0)',
        'USB Composite Device',
        'Generic USB Hub'
      ],
      expanded: false
    }
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Device Manager" onClose={onClose} width="w-full max-w-4xl" height="h-[85vh]">
        <div className="flex flex-col h-full bg-white dark:bg-dark-bg">
          {/* Toolbar */}
          <div className="border-b border-cloud-gray/20 dark:border-dark-border px-4 py-2 flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded transition-colors font-medium text-cloud-gray-deeper dark:text-dark-text">
              File
            </button>
            <button className="px-3 py-1.5 text-sm hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded transition-colors font-medium text-cloud-gray-deeper dark:text-dark-text">
              Action
            </button>
            <button className="px-3 py-1.5 text-sm hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded transition-colors font-medium text-cloud-gray-deeper dark:text-dark-text">
              View
            </button>
            <button className="px-3 py-1.5 text-sm hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded transition-colors font-medium text-cloud-gray-deeper dark:text-dark-text">
              Help
            </button>
          </div>

          {/* Device Tree */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-0.5">
              {/* Computer root node */}
              <div className="flex items-center gap-2 py-1.5 px-2">
                <MonitorIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text" />
                <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                  CLOUDOS
                </span>
              </div>

              {/* Categories */}
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.id} className="ml-4">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-2 py-1.5 px-2 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded w-full transition-colors"
                    >
                      {category.expanded ? (
                        <ChevronDownIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text flex-shrink-0" />
                      ) : (
                        <ChevronRightIcon size={16} className="text-cloud-gray-deeper dark:text-dark-text flex-shrink-0" />
                      )}
                      <IconComponent size={16} className="text-cloud-gray-deeper dark:text-dark-text flex-shrink-0" />
                      <span className="font-medium text-cloud-gray-deeper dark:text-dark-text text-left">
                        {category.name}
                      </span>
                    </button>

                    {/* Devices under category */}
                    {category.expanded && (
                      <div className="ml-8 space-y-0.5">
                        {category.devices.map((device, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 py-1.5 px-2 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded cursor-pointer transition-colors"
                          >
                            <CircuitBoardIcon size={16} className="text-cloud-gray-dark dark:text-dark-text-muted flex-shrink-0" />
                            <span className="text-sm text-cloud-gray-deeper dark:text-dark-text">
                              {device}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Bar */}
          <div className="border-t border-cloud-gray/20 dark:border-dark-border px-4 py-2 text-xs text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
            {categories.filter(c => c.expanded).reduce((sum, c) => sum + c.devices.length, 0)} devices shown
          </div>
        </div>
      </Window>
    </div>
  );
}
