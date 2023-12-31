import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CommentSection', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Add a comment.../i)).toBeInTheDocument();
});
