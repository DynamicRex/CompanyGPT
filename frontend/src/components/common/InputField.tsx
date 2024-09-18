import React from 'react';

interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-lg">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 border border-gray-100 rounded-xl bg-gray-200"
      />
    </div>
  );
};

export default InputField;
