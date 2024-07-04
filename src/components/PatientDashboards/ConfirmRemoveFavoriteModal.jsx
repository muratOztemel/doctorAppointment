const ConfirmRemoveFavoriteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}>
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to remove this doctor from your favorites?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveFavoriteModal;
