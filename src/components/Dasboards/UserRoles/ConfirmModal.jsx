import ReactDOM from "react-dom";

const ConfirmModal = ({ onClose, onConfirm, message }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={handleBackgroundClick}
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="flex flex-col justify-start gap-5 p-4 bg-white shadow-md rounded-lg z-10">
        <h4 className="text-lg font-bold mb-4 text-cyan-500">{message}</h4>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Delete role">
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Cancel role">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ConfirmModal;
