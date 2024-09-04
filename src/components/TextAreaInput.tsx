import React from 'react';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="border border-neutral-500 rounded-lg p-4 mt-6">
      <h2 className="text-white text-lg mb-4 text-center">{label}</h2>
      <textarea
        className="w-full bg-black border bg-opacity-60 border-neutral-500 text-white p-4 rounded-lg resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </div>
  );
};

export default TextAreaInput;