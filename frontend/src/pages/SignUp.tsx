import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputField from '../components/common/InputField';
import Dropdown from '../components/common/Dropdown';
import Button from '../components/common/Button';

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
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <Header showSignInButton={true} />
      <main className="w-full max-w-lg mt-10 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          The AI Brain for Your Company
        </h1>
        <form className="space-y-6">
          <InputField
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputField
            type="text"
            label="Company Name"
            placeholder="Acme Inc"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputField
            type="text"
            label="Company Address"
            placeholder="123 Main St, San Francisco, CA"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
          <Dropdown
            label="Industry Type"
            options={['Technology', 'Finance', 'Healthcare']}
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
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
