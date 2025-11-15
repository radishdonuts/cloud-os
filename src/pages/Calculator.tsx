import { useState } from 'react';
import { Window } from '../components/layout/Window';

export interface CalculatorProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}

export function Calculator({
  onClose,
  onMaximize,
  maximized = false,
  zIndex = 40
}: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay((currentValue * -1).toString());
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    setDisplay((currentValue / 100).toString());
  };

  const buttons = [
    ['AC', 'DEL', '%', '÷'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in" style={{ zIndex }}>
      <Window
        title="Calculator"
        onClose={onClose}
        onMaximize={onMaximize}
        maximized={maximized}
        width="w-full max-w-sm"
        height="h-auto"
        zIndex={zIndex}
      >
        <div className="p-6 bg-gradient-to-b from-cloud-gray/10 to-cloud-gray/5 dark:from-dark-bg-lighter dark:to-dark-bg">
          {/* Display */}
          <div className="bg-white/50 dark:bg-dark-bg-light/50 backdrop-blur-cloud rounded-cloud-lg p-6 mb-6 border border-cloud-gray/20 dark:border-dark-border">
            <div className="text-right">
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mb-2">
                {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
              </p>
              <p className="text-5xl font-bold text-cloud-gray-deeper dark:text-dark-text break-words">
                {display}
              </p>
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="space-y-3">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((btn) => {
                  let bgColor = 'bg-cloud-gray/20 dark:bg-dark-bg-lighter hover:bg-cloud-gray/30 dark:hover:bg-dark-bg-lighter/70';
                  let textColor = 'text-cloud-gray-deeper dark:text-dark-text';

                  if (btn === '=') {
                    bgColor = 'bg-cloud-green/80 hover:bg-cloud-green/90 dark:bg-cloud-green/70 dark:hover:bg-cloud-green/80';
                    textColor = 'text-white font-bold';
                  } else if (btn === 'AC') {
                    bgColor = 'bg-red-500/70 hover:bg-red-500/80 dark:bg-red-600/70 dark:hover:bg-red-600/80';
                    textColor = 'text-white font-bold';
                  } else if (['+', '-', '*', '÷', '%', 'DEL', '+/-'].includes(btn)) {
                    bgColor = 'bg-cloud-blue/20 dark:bg-cloud-blue/30 hover:bg-cloud-blue/30 dark:hover:bg-cloud-blue/40';
                    textColor = 'text-cloud-blue dark:text-cloud-blue font-semibold';
                  }

                  const handleClick = () => {
                    if (btn === 'AC') {
                      handleClear();
                    } else if (btn === 'DEL') {
                      handleBackspace();
                    } else if (btn === '+/-') {
                      handleToggleSign();
                    } else if (btn === '%') {
                      handlePercentage();
                    } else if (btn === '=') {
                      handleEquals();
                    } else if (['+', '-', '*', '÷'].includes(btn)) {
                      handleOperation(btn === '÷' ? '/' : btn);
                    } else if (btn === '.') {
                      handleDecimal();
                    } else {
                      handleNumberClick(btn);
                    }
                  };

                  return (
                    <button
                      key={btn}
                      onClick={handleClick}
                      className={`
                        py-4 px-3 rounded-cloud-lg transition-all duration-150 font-semibold text-lg
                        border border-cloud-gray/10 dark:border-dark-border/30
                        ${bgColor} ${textColor}
                        hover:scale-105 active:scale-95
                      `}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
}
