import React from 'react';
import './ConfirmationModal.css';  // Assuming you have a CSS file for modal styles

function ConfirmationModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
