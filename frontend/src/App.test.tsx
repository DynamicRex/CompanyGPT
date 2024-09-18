import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the signup form', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Replace the text to match the actual heading
  const headingElement = screen.getByText(/the ai brain for companies/i); 
  expect(headingElement).toBeInTheDocument();
});
