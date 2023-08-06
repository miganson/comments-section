import React from "react";
import "./ConfirmationModal.css"; // Assuming you have a CSS file for modal styles

function ConfirmationModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and cannot be undone.
        </p>
        <button className="btn-no" onClick={onCancel}>
          NO, CANCEL
        </button>
        <button className="btn-yes" onClick={onConfirm}>
          YES, DELETE
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
