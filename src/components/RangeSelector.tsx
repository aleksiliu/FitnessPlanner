import React from 'react';

interface RangeSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({ label, value, onChange, min, max }) => {
  return (
    <div className="border border-neutral-500 rounded-lg p-4 mt-6">
      <h2 className="text-white text-lg mb-4 text-center">{label}</h2>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-white"
      />
      <div className="text-white text-center mt-2">{value}</div>
    </div>
  );
};

export default RangeSelector;