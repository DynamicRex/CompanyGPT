import React from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="w-full max-w-lg">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-4 border border-gray-100 rounded-xl bg-gray-200"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
