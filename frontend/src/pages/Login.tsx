// frontend/src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { HeaderLogin } from '../components/layout/Header';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { login as loginAPI } from '../services/authService'; // API call
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../stores/authSlice'; // Import Redux action

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Set up Redux dispatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    try {
      const response = await loginAPI({ email, password }); // Call the login service
      const { access_token, role, user_id } = response.data; // <-- Ensure the backend is sending user_id

      // Dispatch login action to store token, role, and userId in Redux store
      dispatch(login({ token: access_token, role, userId: user_id })); // <-- Include user_id here

      // Redirect based on role
      if (role === 'superuser') {
        navigate('/dashboard/superuser');
      } else if (role === 'user') {
        navigate('/dashboard/user');
      }
    } catch (err: any) {
      setError(err?.detail || 'Login failed'); // Display backend error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderLogin showSignUpButton={true} />
      <main className="flex-1 w-full max-w-2xl mt-24 mx-auto px-4">
        <h1 className="text-center text-3xl font-bold text-gray-900 uppercase mb-10">
          Welcome Back to CompanyGPT
        </h1>

        <form className="ml-24 w-full max-w-md space-y-6" onSubmit={handleSubmit}>
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

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember Me
            </label>
          </div>

          <div className="text-sm">
            <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot Your Password?
            </a>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button text={isLoading ? 'Logging In...' : 'Log In'} onClick={() => {}} disabled={isLoading} />

          <div className="text-sm text-center mt-4">
            <span>Don't have an account? </span>
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Create an Account
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
