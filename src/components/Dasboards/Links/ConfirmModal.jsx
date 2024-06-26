import React from "react";

const ConfirmModal = ({ onClose, onConfirm, message }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}></div>
      <div
        className="bg-white p-6 rounded-lg shadow-lg z-10"
        onClick={(e) => e.stopPropagation()}>
        <h4 className="text-lg font-bold mb-4 text-cyan-500">{message}</h4>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Delete link">
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
