import { format } from "date-fns";
import useDefaultImage from "../hooks/DefaultImage";
import { useSelector } from "react-redux";
import {
  useGetAppointmentsQuery,
  useAddNewAppointmentMutation,
} from "../../redux/features/api/apiSlice";
import { toast } from "react-toastify";

const ConfirmAppointmentModal = ({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  selectedSlot,
  branchName,
  onConfirm,
}) => {
  const { patientId } = useSelector((state) => state.patient);
  const [addNewAppointment, { isLoading: isAdding }] =
    useAddNewAppointmentMutation();
  const { data: appointments, isLoading, isError } = useGetAppointmentsQuery();
  const defaultImage = useDefaultImage(doctor.doctorInfo);

  if (!isOpen) return null;

  if (isLoading && isAdding) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching appointments</div>;
  }

  const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
  const formattedTime = format(
    new Date(`2000-01-01T${selectedSlot}`),
    "HH:mm:ss"
  );

  const handleConfirm = async () => {
    try {
      const result = await addNewAppointment({
        doctorId: doctor.id,
        patientId,
        appointmentDate: formattedDate,
        appointmentTime: formattedTime,
        status: 1,
      });

      console.log(result);
      if (result.error.originalStatus === 400) {
        toast.error(
          "You have another appointment at this date with this doctor!",
          {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        toast.success("The appointment has been created successfully.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        onConfirm(selectedSlot); // Slotu onayla ve durumu bildir
      }
    } catch (error) {
      console.error("Error add appointment", error);
    }

    onClose();
  };

  const doctorFullName = `${doctor.title} ${doctor.name} ${doctor.surname}`;

  const handleCancel = () => {
    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-50 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold">Appointment Confirmation</h2>
        <p>{branchName}</p>
        <p>
          <img
            src={defaultImage}
            alt={`${doctor.name} ${doctor.surname}`}
            className="w-36 h-36 rounded-full object-cover bg-white border border-dashed border-cyan-500 p-2 items-center"
          />
        </p>
        <p>Doctor Name: {doctorFullName}</p>
        <p>
          Appointment Date: {formattedDate} {selectedSlot}
        </p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded">
            Onayla
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAppointmentModal;
