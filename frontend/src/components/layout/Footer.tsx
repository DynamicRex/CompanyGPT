import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 bg-gray-50 text-sm text-gray-600">
      <p>
        By signing up, you agree to our{' '}
        <a href="/terms" className="text-blue-500 hover:underline">Terms</a> and{' '}
        <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
      </p>
      <p>You consent to receiving marketing messages from us.</p>
    </footer>
  );
};

export default Footer;
