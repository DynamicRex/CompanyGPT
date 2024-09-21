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
      className="w-full max-w-lg bg-[#5c50f7] text-white py-3 rounded-lg hover:bg-[#4c41ea] transition" // Updated background color and hover color
      disabled={disabled} // Use disabled here
    >
      {text}
    </button>
  );
};

export default Button;
