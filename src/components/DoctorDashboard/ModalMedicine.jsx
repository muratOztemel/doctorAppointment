import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGetMedicinesQuery } from "../../redux/features/api/apiSlice";

const ModalMedicine = ({ onClose, onConfirm }) => {
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [dosageQuantity, setDosageQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [dosages, setDosages] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const { data: medicines = [], isLoading, isError } = useGetMedicinesQuery();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden"; // Prevent main scrollbar

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = ""; // Re-enable main scrollbar
    };
  }, [onClose]);

  useEffect(() => {
    const firstFocusableElement = document.querySelector(
      "#modalContainer button, #modalContainer input"
    );
    firstFocusableElement && firstFocusableElement.focus();
    return () => {
      const previouslyFocusedElement = document.activeElement;
      previouslyFocusedElement && previouslyFocusedElement.focus();
    };
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines((prevState) =>
      prevState.includes(medicine)
        ? prevState.filter((item) => item !== medicine)
        : [...prevState, medicine]
    );
  };

  const handleAddMedicines = () => {
    setSecondModalOpen(false);
  };

  const handleRemoveMedicine = (medicine) => {
    setSelectedMedicines((prevState) =>
      prevState.filter((item) => item !== medicine)
    );
  };

  const handleConfirm = () => {
    const medicineData = {
      medicines: selectedMedicines,
      quantity,
      dosageQuantity,
      instructions,
      dosages,
    };
    console.log("Confirming Medicine Data:", medicineData);
    onConfirm(medicineData);
    onClose(); // Close modal after confirmation
  };

  const handleDosageChange = (e) => {
    const { name, checked } = e.target;
    setDosages((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={handleOutsideClick}></div>
      <div
        className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        id="modalContainer"
        role="dialog"
        aria-modal="true">
        <div className="w-full flex justify-between items-center gap-2 mb-8">
          <h1 className="font-semibold">Add Item</h1>
          <button
            className="w-12 h-10 bg-cyan-100 text-cyan-600 rounded-md flex justify-center items-center"
            onClick={onClose}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 352 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Choose Medicine</p>
            <button
              className="text-cyan-500 flex justify-center items-center text-center gap-2 rounded-lg border border-cyan-500 border-dashed py-4 w-full text-sm"
              onClick={() => setSecondModalOpen(true)}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
              </svg>{" "}
              Add Item
            </button>
          </div>
          {selectedMedicines.length > 0 && (
            <div className="w-full flex flex-col gap-2 mt-4">
              {selectedMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex justify-between items-center p-2 border border-cyan-500 rounded-lg">
                  <span>{medicine.name}</span>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveMedicine(medicine)}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 352 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Instruction</p>
            <div className="text-sm relative w-full">
              <div className="w-full">
                <select
                  className="w-full focus:outline-none border border-cyan-300 font-normal rounded-lg p-4 focus:border-cyan-500"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}>
                  <option value="">Select Instruction</option>
                  <option value="before meal">Before Meal</option>
                  <option value="after meal">After Meal</option>
                </select>
              </div>
            </div>
          </div>
          <div className="text-sm w-full">
            <label className="text-black text-sm focus:outline-none">
              Quantity
            </label>
            <input
              type="number"
              className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-300 font-normal rounded-lg focus:outline-none focus:border-cyan-500"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="text-sm w-full">
            <label className="text-black text-sm focus:outline-none">
              Dosage Quantity
            </label>
            <input
              type="number"
              className="w-full bg-transparent text-sm mt-3 p-4 border border-cyan-300 font-normal rounded-lg focus:outline-none focus:border-cyan-500"
              value={dosageQuantity}
              onChange={(e) => setDosageQuantity(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="text-black text-sm">Dosage</p>
            <div className="flex gap-6 pb-6">
              <div className="text-sm w-full flex flex-row items-center">
                <label className="flex flex-col justify-center items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    name="morning"
                    value="morning"
                    className="border border-solid rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-cyan-300 bg-white"
                    checked={dosages.morning}
                    onChange={handleDosageChange}
                  />
                </label>
                <p className="text-black text-xs ml-2">Morning (M)</p>
              </div>
              <div className="text-sm w-full flex flex-row items-center">
                <label className="flex flex-col justify-center items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    name="afternoon"
                    value="afternoon"
                    className="border rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-cyan-100 bg-white"
                    checked={dosages.afternoon}
                    onChange={handleDosageChange}
                  />
                </label>
                <p className="text-black text-xs ml-2">Afternoon (A)</p>
              </div>
              <div className="text-sm w-full flex flex-row items-center">
                <label className="flex flex-col justify-center items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    name="evening"
                    value="evening"
                    className="border rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-cyan-100 bg-white"
                    checked={dosages.evening}
                    onChange={handleDosageChange}
                  />
                </label>
                <p className="text-black text-xs ml-2">Evening (E)</p>
              </div>
            </div>
          </div>

          <button
            className="w-full flex justify-center items-center gap-4 hover:opacity-80 transitions bg-cyan-500 text-white text-sm font-medium px-2 py-4 rounded"
            onClick={handleConfirm}>
            Add
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="text-white text-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
            </svg>
          </button>
        </div>
      </div>
      {isSecondModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setSecondModalOpen(false)}></div>
          <div className="flex w-2/3 h-screen items-center justify-center p-4 text-center">
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
              <div className="w-full flex justify-between items-center gap-2 mb-8">
                <h1 className="font-semibold">Medicine &amp; Services</h1>
                <button
                  onClick={() => setSecondModalOpen(false)}
                  className="w-14 h-12 bg-cyan-100 text-cyan-600 rounded-md flex justify-center items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 352 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center items-center flex-col gap-6">
                <div className="flex items-center gap-4 w-full border border-cyan-500 rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6-6-6-2.691-6-6 2.691-6 6-6z" />
                  </svg>
                </div>
                <div className="w-full h-[500px] overflow-y-scroll gap-2">
                  <div>
                    <div className="space-y-2">
                      {filteredMedicines.map((medicine) => {
                        const isSelected = selectedMedicines.includes(medicine);
                        return (
                          <div
                            key={medicine.id}
                            className={`rounded-xl border-[1px] border-cyan-500 p-4 cursor-pointer ${
                              isSelected
                                ? "bg-cyan-500 text-white"
                                : "hover:bg-cyan-500 hover:text-white"
                            }`}
                            onClick={() => handleMedicineSelect(medicine)}>
                            <h6 className="text-sm">{medicine.name}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  className="w-full flex justify-center items-center gap-4 hover:opacity-80 transitions bg-cyan-500 text-white text-sm font-medium px-2 py-4 rounded"
                  onClick={handleAddMedicines}>
                  Add
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-white text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("root")
  );
};

export default ModalMedicine;
