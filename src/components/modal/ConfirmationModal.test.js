import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

test('renders modal with confirmation message', () => {
  render(<ConfirmationModal show={true} onConfirm={() => {}} onCancel={() => {}} />);
  expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
  expect(screen.getByText('Yes')).toBeInTheDocument();
  expect(screen.getByText('No')).toBeInTheDocument();
});

test('handle confirm action', () => {
  const handleConfirm = jest.fn();
  render(<ConfirmationModal show={true} onConfirm={handleConfirm} onCancel={() => {}} />);
  fireEvent.click(screen.getByText('Yes'));
  expect(handleConfirm).toHaveBeenCalledTimes(1);
});

test('handle cancel action', () => {
  const handleCancel = jest.fn();
  render(<ConfirmationModal show={true} onConfirm={() => {}} onCancel={handleCancel} />);
  fireEvent.click(screen.getByText('No'));
  expect(handleCancel).toHaveBeenCalledTimes(1);
});
