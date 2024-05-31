const ConfirmDeleteAppointment = ({ onClose, onConfirm, message }) => {
  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h4 className="text-lg font-bold mb-4 text-cyan-500">{message}</h4>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Confirm action">
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Cancel action">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAppointment;
