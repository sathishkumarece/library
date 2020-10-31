import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getByText(/welcome to the world's largest collection of books/i);
  expect(titleElement).toBeInTheDocument();
});
