import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';
test('renders comment details', () => {
  const comment = {
    id: '1',
    content: 'This is a comment',
    createdAt: new Date().toISOString(),
    score: 10,
    user: {
      username: 'yoda',
      image: { png: 'avatars/yoda.png' }
    }
  };
  render(<Comment comment={comment} onUpvote={() => {}} onDownvote={() => {}} onDelete={() => {}} onReply={() => {}} />);

  expect(screen.getByText('This is a comment')).toBeInTheDocument();
});
