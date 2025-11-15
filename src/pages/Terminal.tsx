import React, { useEffect, useRef, useState } from 'react';
import { Window } from '../components/layout/Window';
import { FILE_MANAGER_ROOTS } from './FileManager';

export interface TerminalProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}

type HistoryItem = {
  command: string;
  output: string[];
};

export function Terminal({ onClose, onMaximize, maximized = false, zIndex = 40 }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  function handleCommandLine(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'exit') {
      setHistory(prev => [...prev, { command: trimmed, output: [] }]);
      setTimeout(() => onClose(), 50);
      return;
    }

    const result = handleCommand(trimmed, cmd, args);

    setHistory(prev => [...prev, { command: trimmed, output: result.split('\n') }]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandLine(input);
      setInput('');
    }
  }

  function handleCommand(raw: string, cmd: string, args: string[]) {
    switch (cmd) {
      case 'help':
        return [
          'Available commands:',
          'help       - Show available commands',
          'exit       - Close the terminal',
          'echo [msg] - Print a message',
          'clear      - Clear the terminal',
          'date       - Show the current date and time',
          'about      - Show information about this CloudOS prototype',
          'ls         - List mock files',
          'cd [dir]   - Simulated directory change'
        ].join('\n');
      case 'echo':
        return args.join(' ');
      case 'date':
        return new Date().toString();
      case 'about':
        return 'CloudOS Prototype Terminal v0.1\nThis terminal is a simulation and does not execute real system commands.';
      case 'ls':
        return 'Documents  Desktop  Downloads  Pictures  Music  config.json';
      case 'cd':
        if (args.length === 0) return 'cd: missing operand';
        // only allow cd to directories known by the File Manager roots
        const target = args[0];
        const allowed = FILE_MANAGER_ROOTS.find(r => r.toLowerCase() === target.toLowerCase());
        if (!allowed) {
          return `directory not found: ${raw}`;
        }
        // return change without mentioning "simulated"
        return `Directory changed to /${allowed}\nSImulation only. Directory changed back to /home`;
      default:
        return `command not found: ${raw}`;
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Terminal" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-3xl" height="h-[60vh]">
        <div className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-auto bg-black rounded-cloud p-4 font-mono text-sm text-cloud-green/90" ref={outputRef}>
            {history.length === 0 && <div className="text-cloud-gray-dark dark:text-dark-text-muted">cloudos@device:~$ Type `help` to see available commands</div>}

            {history.map((h, idx) => (
              <div key={idx} className="mb-3">
                <div className="text-cloud-green">
                  <span className="font-medium">cloudos@device:~$</span> {h.command}
                </div>
                <div className="whitespace-pre-wrap mt-1 text-cloud-gray-dark dark:text-dark-text-muted">
                  {h.output.map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-sm text-cloud-green">cloudos@device:~$</span>
            <input
              className="flex-1 bg-transparent border-0 focus:outline-none font-mono text-sm text-cloud-gray-deeper dark:text-dark-text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command and press Enter"
              aria-label="Terminal input"
            />
            <button className="px-3 py-1 bg-cloud-gray/10 rounded-cloud hover:bg-cloud-gray/20" onClick={() => { handleCommandLine(input); setInput(''); }}>
              Run
            </button>
          </div>
        </div>
      </Window>
    </div>
  );
}

export default Terminal;
