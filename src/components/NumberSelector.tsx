import React, { useEffect, useRef, useState } from 'react';

interface NumberSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ label, value, onChange, min, max, unit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedRef = useRef<HTMLDivElement>(null);
  
    const handleIncrement = () => onChange(Math.min(value + 1, max));
    const handleDecrement = () => onChange(Math.max(value - 1, min));
    const handleSelect = (newValue: number) => {
      onChange(newValue);
      setIsOpen(false);
    };
  
    useEffect(() => {
        if (isOpen && selectedRef.current) {
          selectedRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, [isOpen]);

    return (
      <div className="border border-neutral-500 rounded-lg p-4 mt-6">
        <h2 className="text-white text-lg mb-4 text-center">{label}</h2>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handleDecrement} className="text-white text-3xl focus:outline-none">-</button>
          <button 
            className="text-white text-5xl focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            {value}
          </button>
          <button onClick={handleIncrement} className="text-white text-3xl focus:outline-none">+</button>
        </div>
        {unit && <div className="text-gray-400 text-center mt-2">{unit}</div>}
        
        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4">
            <div className="flex justify-between p-4 border-b">
              <button onClick={() => setIsOpen(false)} className="text-blue-500">Cancel</button>
              <button onClick={() => setIsOpen(false)} className="text-blue-500 font-bold">Done</button>
            </div>
            <div className="h-48 overflow-scroll">
              {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
                <div
                  key={num}
                  ref={num === value ? selectedRef : null}
                  className={`p-4 text-center text-lg ${
                    num === value ? 'bg-blue-100 text-blue-500 font-bold' : 'text-gray-700'
                  }`}
                  onClick={() => handleSelect(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberSelector;