const ConfirmModal = ({ onClose, onConfirm, message }) => {
  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h4 className="text-lg font-bold mb-4 text-cyan-500">{message}</h4>
      <div className="flex justify-between">
        <button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Delete holiday">
          Delete
        </button>
        <button
          onClick={onClose}
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Cancel holiday">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
