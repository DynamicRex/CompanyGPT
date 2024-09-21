// frontend/src/pages/Login.tsx

import React, { useState } from 'react';
import { HeaderLogin } from '../components/layout/Header'; // Import the Login Header
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox

  // Handle form submission (for now, we'll just log the data)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      email,
      password,
      rememberMe
    });
    // We will handle the actual submission logic later when connecting to the backend
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderLogin showSignUpButton={true} /> {/* Use the Login Header */}
      <main className="flex-1 w-full max-w-2xl mt-24 mx-auto px-4">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-900 uppercase mb-10">
          Welcome Back to CompanyGPT
        </h1>

        {/* Form */}
        <form className="ml-24 w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <InputField
            type="email"
            label="Email ID"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <InputField
            type="password"
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-[#5c50f7] border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="text-sm">
            <a href="/forgot-password" className="font-medium text-[#5c50f7] hover:text-blue-500">
              Forgot Your Password?
            </a>
          </div>

          {/* Log In Button */}
          <Button text="Log In" onClick={() => handleSubmit} />

          {/* Create Account Link */}
          <div className="text-sm text-center mt-4">
            <span>Don't have an account? </span>
            <a href="/signup" className="font-medium text-[#5c50f7] hover:text-blue-500">
              Create an Account
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
