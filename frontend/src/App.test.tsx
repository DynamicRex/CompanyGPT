import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the signup form', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  
  // Replace the outdated "learn react" with text that actually exists in your app
  const headingElement = screen.getByText(/the ai brain for your company/i); 
  expect(headingElement).toBeInTheDocument();
});
