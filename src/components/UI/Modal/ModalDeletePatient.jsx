import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import {
  useGetPatientByIdQuery,
  useDeletePatientMutation,
} from "../../../redux/features/api/apiSlice";
import Spinner from "../Spinner";

const ModalDeletePatient = ({ isShowError, setIsShowError, message }) => {
  const { patientId } = useSelector((state) => state.tablePatients);
  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);
  const [
    deletePatient,
    { isError: isErrorDelete, isLoading: isLoadingDelete },
  ] = useDeletePatientMutation();

  if (!isShowError) return null;

  if (isError || isErrorDelete) return <div>Error!</div>;
  if (isLoading || isLoadingDelete) return <Spinner />;

  const handleDeletePatient = async () => {
    try {
      await deletePatient(patientId).unwrap();
      setIsShowError(false);
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return createPortal(
    <div className="error-modal fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-500 opacity-75"
        onClick={() => setIsShowError(false)}></div>
      <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
        <div className="bg-red-500 text-white px-4 py-2">
          <h2 className="text-3xl font-semibold text-center">Attention!</h2>
        </div>
        <div className="p-4 text-center">
          <svg
            className="w-20 h-20 text-red-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
            {message} <br />
            <strong>
              {patient?.name} {patient?.surname}
            </strong>
          </h3>
        </div>
        <div className="border-t px-4 py-2 flex justify-center">
          <button
            onClick={handleDeletePatient}
            disabled={isLoading}
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            Yes, I&apos;m sure
          </button>
          <button
            onClick={() => setIsShowError(false)}
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center">
            No, cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

ModalDeletePatient.propTypes = {
  isShowError: PropTypes.bool.isRequired,
  setIsShowError: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ModalDeletePatient;
