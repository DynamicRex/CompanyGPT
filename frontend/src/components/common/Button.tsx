import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // Add this
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => { // Destructure disabled here
  return (
    <button
      onClick={onClick}
      className="w-full max-w-lg bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      disabled={disabled} // Use disabled here
    >
      {text}
    </button>
  );
};

export default Button;
