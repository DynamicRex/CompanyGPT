import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputField from '../components/common/InputField';
import Dropdown from '../components/common/Dropdown';
import Button from '../components/common/Button';

// Function to capitalize the first letter of each word but leave other characters as typed
const capitalizeFirstLetter = (text: string) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Only capitalize the first letter of each word
      .join(' ');
  };

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [employeesCount, setEmployeesCount] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header showSignInButton={true} />
      <main className="flex-1 w-full max-w-2xl mt-24 mx-auto px-4">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-900 uppercase mb-10">
          THE AI BRAIN FOR YOUR COMPANY
        </h1>
        
       {/* Form */}
       <form className="ml-16 w-full max-w-md space-y-6"> {/* Align form elements left */}
          <InputField
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(capitalizeFirstLetter(e.target.value))}
          />
          <InputField
            type="email"
            label="Email ID"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputField
            type="text"
            label="Company Name"
            placeholder="Acme Inc"
            value={companyName}
            onChange={(e) => setCompanyName(capitalizeFirstLetter(e.target.value))}
          />
          <InputField
            type="text"
            label="Company Address"
            placeholder="123 Main St, San Francisco, CA"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(capitalizeFirstLetter(e.target.value))}
          />
          <InputField
            type="text"
            label="Industry Type"
            placeholder="Technology, Finance, etc."
            value={industryType}
            onChange={(e) => setIndustryType(capitalizeFirstLetter(e.target.value))}
          />
          <Dropdown
            label="Number of Employees"
            options={['1-10', '11-50', '51-200', '200+']}
            value={employeesCount}
            onChange={(e) => setEmployeesCount(e.target.value)}
          />
          <Button text="Submit" onClick={() => {}} />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
