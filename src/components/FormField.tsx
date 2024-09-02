import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'number' | 'select';
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, handleChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    {type === 'select' ? (
      <select
        name={name}
        value={value as string}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
      >
        <option value="" disabled>Select your goal</option>
        <option value="building muscle">Building Muscle</option>
        <option value="losing weight">Losing Weight</option>
        <option value="improving endurance">Improving Endurance</option>
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value as number}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    )}
  </div>
);

export default FormField;