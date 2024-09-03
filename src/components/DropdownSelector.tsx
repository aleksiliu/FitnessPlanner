import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="border border-neutral-500 rounded-lg p-4 mt-6">
      <h2 className="text-white text-lg mb-4 text-center">{label}</h2>
      <select
        className="w-full bg-black border border-neutral-500 text-white p-4 rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select your {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;