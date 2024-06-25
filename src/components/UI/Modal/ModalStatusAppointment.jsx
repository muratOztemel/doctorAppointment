import { useSelector } from "react-redux";
import { object } from "prop-types";
import { createPortal } from "react-dom";
import {
  useGetAppointmentByIdQuery,
  useAppointmentUpdateMutation,
} from "../../../redux/features/api/apiSlice.js";
import Spinner from "../Spinner.jsx";

const ModalStatusAppointment = (props) => {
  const { appointmentId } = useSelector((state) => state.tableAppointments);
  const {
    data: appointment,
    isError,
    isLoading,
  } = useGetAppointmentByIdQuery(appointmentId);
  const [
    AppointmentUpdate,
    { data: updateAppointment, isErrorUpdate, isLoadingUpdate },
  ] = useAppointmentUpdateMutation(appointmentId);
  if (!props.isShowError) {
    return null;
  }
  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isErrorUpdate) return <div>Error: {isErrorUpdate.toString()}</div>;
  if (isLoading || isLoadingUpdate) return <Spinner />;

  const handleUpdateAppointment = async () => {
    try {
      let updatedAppointmentData;

      if (props.changeStatus === "confirmed") {
        updatedAppointmentData = {
          status: 1,
        };
      } else {
        updatedAppointmentData = {
          status: 3,
        };
      }

      const result = await AppointmentUpdate({
        id: appointmentId,
        updatedAppointment: {
          id: appointmentId,
          doctorId: appointment.doctorId,
          patientId: appointment.patientId,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          status: 2,
        },
      });

      props.setIsShowError(false);
    } catch (err) {
      console.error("Error updating appointment:", err);
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
            {props.message} <br />
            <strong>{appointment.patientFullName}</strong>
          </h3>
        </div>
        <div className="border-t px-4 py-2 flex justify-center">
          <button
            onClick={handleUpdateAppointment}
            disabled={isLoading}
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            Yes, I&apos;m sure
          </button>
          <button
            onClick={() => props.setIsShowError(false)}
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            No, cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalStatusAppointment;

ModalStatusAppointment.propTypes = {
  props: object,
};
