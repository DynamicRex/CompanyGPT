import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { HeaderSignUp } from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputField from '../components/common/InputField';
import Dropdown from '../components/common/Dropdown';
import Button from '../components/common/Button';
import { signup, login as loginAPI } from '../services/authService'; // Import both signup and login functions
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../stores/authSlice'; // Import Redux action

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [employeesCount, setEmployeesCount] = useState(''); // Keep it as string
  const [error, setError] = useState<string | null>(null); // Error state for validation or backend errors
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Use navigate for redirection
  const dispatch = useDispatch(); // Set up Redux dispatch

  // Function to capitalize the first letter of each word but leave other characters as typed
  const capitalizeFirstLetter = (text: string) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Only capitalize the first letter of each word
      .join(' ');
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!fullName || !email || !password || !confirmPassword || !companyName || !companyAddress || !industryType || !employeesCount) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    // Validate the form before sending
    if (!validateForm()) {
      return;
    }

    // Handle employeesCount conversion based on string input
    let numberOfEmployees = 0;
    switch (employeesCount) {
      case '1-10':
        numberOfEmployees = 10;
        break;
      case '11-50':
        numberOfEmployees = 50;
        break;
      case '51-200':
        numberOfEmployees = 200;
        break;
      case '200+':
        numberOfEmployees = 500; // You can decide a value for "200+" here
        break;
      default:
        numberOfEmployees = 0;
    }

    const formData = {
      full_name: fullName,
      email,
      password,
      company_name: companyName,
      company_address: companyAddress,
      industry_type: industryType,
      number_of_employees: numberOfEmployees,
    };

    // Log form data to the console before submitting
    console.log("Form Data: ", formData);

    setIsLoading(true); // Set loading state

    try {
      // Send data to the backend
      await signup(formData);

      // After successful sign-up, log the user in automatically
      const response = await loginAPI({ email, password });
      const { access_token } = response.data;

      // Dispatch login action to store token and role in Redux store
      dispatch(login({ token: access_token, role: 'superuser' })); // Role is always superuser in the sign-up flow

      // Redirect to the superuser dashboard
      navigate('/dashboard/superuser');

    } catch (error: any) {
      setError(error?.message || 'Signup failed');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderSignUp showLoginButton={true} />
      <main className="flex-1 w-full max-w-2xl mt-24 mx-auto px-4">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-900 uppercase mb-10">
          THE AI BRAIN FOR COMPANIES
        </h1>

        {/* Form */}
        <form className="ml-24 w-full max-w-md space-y-6" onSubmit={handleSubmit}>
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
            onChange={(e) => setEmployeesCount(e.target.value)} // Handle as string and convert later
          />
         
          {/* Display error if exists */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {/* Submit Button */}
          <Button text={isLoading ? 'Submitting...' : 'Submit'} onClick={() => {}} disabled={isLoading} />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
