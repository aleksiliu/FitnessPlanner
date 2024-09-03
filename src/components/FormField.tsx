import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  min?: number;
  max?: number;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, handleChange, min, max }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    {type === 'select' ? (
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="">Select your goal</option>
          <option value="weightLoss">Weight Loss</option>
          <option value="muscleGain">Muscle Gain</option>
          <option value="endurance">Endurance</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    ) : type === 'range' ? (
      <div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          className="w-full bg-gray-700 appearance-none rounded-lg h-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-md text-gray-300 mt-1">
          <span>{value}</span>
        </div>
      </div>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    )}
  </div>
);

export default FormField;