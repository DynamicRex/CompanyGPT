import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import App from './App';
import store from './stores'; // Import the Redux store

test('renders the signup form', () => {
  render(
    <Provider store={store}> {/* Wrap App with Provider */}
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // Replace the text to match the actual heading
  const headingElement = screen.getByText(/the ai brain for companies/i);
  expect(headingElement).toBeInTheDocument();
});
