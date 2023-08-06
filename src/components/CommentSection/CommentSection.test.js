import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentSection from './CommentSection';

test('handles adding new comment', () => {
  render(<CommentSection />);
  const input = screen.getByPlaceholderText("Write a comment...");
  fireEvent.change(input, { target: { value: 'New Comment' } });
  fireEvent.click(screen.getByText('Comment'));

  // Validate that new comment is added
  expect(screen.getByText('New Comment')).toBeInTheDocument();
});
