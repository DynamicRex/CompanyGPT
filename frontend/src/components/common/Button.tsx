import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-lg bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
};

export default Button;
