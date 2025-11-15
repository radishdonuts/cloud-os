import { useState, useEffect } from 'react';

export function BIOSScreen({
  onContinue
}: {
  onContinue: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0); // 0=Main, 1=Advanced, 2=Boot, 3=Security, 4=Exit
  const [selectedOption, setSelectedOption] = useState(0);

  const tabs = ['Main', 'Advanced', 'Boot', 'Security', 'Exit'];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveTab(prev => Math.max(0, prev - 1));
        setSelectedOption(0);
      } else if (e.key === 'ArrowRight') {
        setActiveTab(prev => Math.min(tabs.length - 1, prev + 1));
        setSelectedOption(0);
      } else if (e.key === 'ArrowUp') {
        setSelectedOption(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        const maxOptions = activeTab === 0 ? 6 : activeTab === 1 ? 2 : activeTab === 2 ? 3 : activeTab === 3 ? 2 : 1;
        setSelectedOption(prev => Math.min(maxOptions, prev + 1));
      } else if (e.key === 'F10') {
        e.preventDefault();
        onContinue();
      } else if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, onContinue, tabs.length]);

  return (
    <div className="w-full min-h-screen bg-[#000080] text-[#FFFFFF] font-mono flex flex-col p-0">
      {/* Header Bar */}
      <div className="bg-[#0000AA] text-white px-4 py-2 flex justify-between items-center border-b-2 border-[#5555FF]">
        <div className="text-lg font-bold">CloudOS BIOS Setup Utility</div>
        <div className="text-sm">Version 2.0.1</div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#00AAAA] border-b-2 border-[#55FFFF] flex">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`px-6 py-2 cursor-pointer ${
              activeTab === index ? 'bg-[#AAAAAA] text-black font-bold' : 'text-white'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex gap-6">
        {/* Left Panel - Main Info */}
        <div className="flex-1 space-y-4">
          {activeTab === 0 && (
            <div className="space-y-3">
              <div className="text-[#00FFFF] font-bold mb-4">Main</div>
              <div className="space-y-2 text-sm">
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055]">
                  <div className="text-[#FFFF00]">System Information</div>
                </div>
                <div className={`p-2 ${selectedOption === 0 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Processor Type:</span>
                    <span className="text-[#00FF00]">Intel(R) Core i7-12700K</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 1 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Processor Speed:</span>
                    <span className="text-[#00FF00]">3.6 GHz</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 2 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>CPU Cores:</span>
                    <span className="text-[#00FF00]">12 (8P + 4E)</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 3 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Total Memory:</span>
                    <span className="text-[#00FF00]">32 GB DDR5</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 4 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Memory Speed:</span>
                    <span className="text-[#00FF00]">5600 MHz</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 5 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>BIOS Version:</span>
                    <span className="text-[#00FF00]">CloudOS 2.0.1</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 6 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>BIOS Date:</span>
                    <span className="text-[#00FF00]">11/14/2025</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-3">
              <div className="text-[#00FFFF] font-bold mb-4">Advanced</div>
              <div className="space-y-2 text-sm">
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055]">
                  <div className="text-[#FFFF00]">CPU Configuration</div>
                </div>
                <div className={`p-2 ${selectedOption === 0 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Intel Virtualization Technology</span>
                    <span className="text-[#00FF00]">[Enabled]</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 1 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Hyper-Threading</span>
                    <span className="text-[#00FF00]">[Enabled]</span>
                  </div>
                </div>
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055] mt-4">
                  <div className="text-[#FFFF00]">SATA Configuration</div>
                </div>
                <div className={`p-2 ${selectedOption === 2 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>SATA Mode</span>
                    <span className="text-[#00FF00]">[AHCI]</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="text-[#00FFFF] font-bold mb-4">Boot</div>
              <div className="space-y-2 text-sm">
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055]">
                  <div className="text-[#FFFF00]">Boot Priority Order</div>
                </div>
                <div className={`p-2 ${selectedOption === 0 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00]">1.</span>
                    <span>CloudOS (NVMe SSD - 1TB)</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 1 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00]">2.</span>
                    <span>USB Storage Device</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 2 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF00]">3.</span>
                    <span>Network Boot (PXE)</span>
                  </div>
                </div>
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055] mt-4">
                  <div className="text-[#FFFF00]">Boot Options</div>
                </div>
                <div className={`p-2 ${selectedOption === 3 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Fast Boot</span>
                    <span className="text-[#00FF00]">[Disabled]</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-3">
              <div className="text-[#00FFFF] font-bold mb-4">Security</div>
              <div className="space-y-2 text-sm">
                <div className="border-2 border-[#5555FF] p-3 bg-[#000055]">
                  <div className="text-[#FFFF00]">Security Settings</div>
                </div>
                <div className={`p-2 ${selectedOption === 0 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Secure Boot</span>
                    <span className="text-[#00FF00]">[Enabled]</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 1 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>TPM Device</span>
                    <span className="text-[#00FF00]">[Enabled]</span>
                  </div>
                </div>
                <div className={`p-2 ${selectedOption === 2 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  <div className="flex justify-between">
                    <span>Set Administrator Password</span>
                    <span className="text-[#FF0000]">[Not Set]</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className="space-y-3">
              <div className="text-[#00FFFF] font-bold mb-4">Exit</div>
              <div className="space-y-2 text-sm">
                <div className={`p-2 ${selectedOption === 0 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  Save Changes and Reset
                </div>
                <div className={`p-2 ${selectedOption === 1 ? 'bg-[#AAAAAA] text-black' : ''}`}>
                  Discard Changes and Exit
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Help */}
        <div className="w-80 border-2 border-[#5555FF] p-4 bg-[#000055] space-y-2 text-sm h-fit">
          <div className="text-[#FFFF00] font-bold mb-3">Help</div>
          <div className="space-y-1 text-xs">
            <div className="flex gap-2">
              <span className="text-[#00FF00]">↑↓</span>
              <span>Select Item</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#00FF00]">←→</span>
              <span>Select Menu</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#00FF00]">Enter</span>
              <span>Select</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#00FF00]">F10</span>
              <span>Save and Exit</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#00FF00]">ESC</span>
              <span>Exit</span>
            </div>
          </div>
          <div className="border-t-2 border-[#5555FF] mt-4 pt-4">
            <div className="text-[#FFFF00] mb-2">Item Specific Help</div>
            <div className="text-xs leading-relaxed">
              {activeTab === 0 && 'System information and hardware configuration details.'}
              {activeTab === 1 && 'Configure advanced CPU and system settings.'}
              {activeTab === 2 && 'Set the boot device priority order.'}
              {activeTab === 3 && 'Configure security and password settings.'}
              {activeTab === 4 && 'Save changes or exit without saving.'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0000AA] text-white px-4 py-2 border-t-2 border-[#5555FF] flex justify-between text-sm">
        <div className="flex gap-6">
          <span><span className="text-[#FFFF00]">F1</span> Help</span>
          <span><span className="text-[#FFFF00]">F9</span> Optimized Defaults</span>
          <span><span className="text-[#FFFF00]">F10</span> Save & Exit</span>
        </div>
        <div>
          <span><span className="text-[#FFFF00]">ESC</span> Exit</span>
        </div>
      </div>
    </div>
  );
}
