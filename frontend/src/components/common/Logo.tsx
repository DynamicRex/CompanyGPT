// frontend/src/components/common/Logo.tsx

import React from 'react';
import logo from '../../assets/images/Logo brain.png';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img className="w-12" src={logo} alt="CompanyGPT Logo" />
    </div>
  );
};

export default Logo;
