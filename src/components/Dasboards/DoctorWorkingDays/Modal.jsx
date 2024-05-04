import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "modal-backdrop") onClose();
  };

  return ReactDOM.createPortal(
    <div
      id="modal-backdrop"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
