import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentSection from './CommentSection';

test('handles adding new comment', () => {
  render(<CommentSection />);
  const input = screen.getByPlaceholderText("Add a comment...");
  fireEvent.change(input, { target: { value: 'New Comment' } });
  fireEvent.click(screen.getByText('Send'));

  // Validate that new comment is added
  expect(screen.getByText('New Comment')).toBeInTheDocument();
});
