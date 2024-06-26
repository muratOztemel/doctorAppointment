import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalMedicineList = ({ isMedicineModalOpen, setIsMedicineModalOpen }) => {
  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false);
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden"; // Prevent main scrollbar

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = ""; // Re-enable main scrollbar
    };
  }, [onCloseModal]);

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

  return createPortal(
    <div className="second-modal fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={() => setIsSecondModalOpen(false)}></div>
      <div className="relative flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100"
          id="headlessui-dialog-panel-:rbq:"
          data-headlessui-state="open">
          <div className="w-full flex-btn gap-2 mb-8">
            <h1 className="text-md font-semibold">Medicine &amp; Services</h1>
            <button className="w-14 h-12 bg-dry text-red-600 rounded-md flex-colo">
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
          <div className="flex-colo gap-6">
            <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
              <input type="text" placeholder="Search" className="w-full" />
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className=" text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
              </svg>
            </div>
            <div className="w-full h-[500px] overflow-y-scroll">
              <div id="headlessui-radiogroup-:rbr:" role="radiogroup">
                <div className="space-y-2" role="none">
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rbs:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={0}
                    data-headlessui-state="">
                    <h6 className="text-sm">Amoxicillin</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rbt:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Aspirin</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rbu:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Codeine</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rbv:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Braces</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc0:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Bridges</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc1:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Crowns</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc2:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Implants</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc3:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Sealants</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc4:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dental Veneers</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc5:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Dentures</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc6:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Diazepam</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc7:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Ibuprofen</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc8:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Lorazepam</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rc9:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Paracetamol</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rca:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Root Canal</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rcb:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Teeth Whitening</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rcc:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Tooth Extraction</h6>
                  </div>
                  <div
                    className="
              
              rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white"
                    id="headlessui-radiogroup-option-:rcd:"
                    role="radio"
                    aria-checked="false"
                    tabIndex={-1}
                    data-headlessui-state="">
                    <h6 className="text-sm">Tramadol</h6>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2 py-4 rounded">
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
    </div>,
    document.getElementById("root")
  );
};

export default ModalMedicineList;
