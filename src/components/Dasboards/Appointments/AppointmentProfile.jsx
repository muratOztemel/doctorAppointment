import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useParams, Link } from "react-router-dom";
import {
  useGetAppointmentsByPatientAndDateQuery,
  useGetPatientByIdQuery,
  useGetDoctorByIdQuery,
} from "../../../redux/features/api/apiSlice";
import BloodType from "../Services/BloodType.jsx";
import Spinner from "../../UI/Spinner.jsx";
import PatientStickyLink from "../Services/PatientStickyLink.jsx";
import { format } from "date-fns";

const AppointmentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id: patientId } = useParams();
  const selectedDate = new Date().toISOString().split("T")[0]; // Set the selected date to today

  patientId = Number(patientId);

  const {
    data: appointments,
    isError,
    isLoading,
  } = useGetAppointmentsByPatientAndDateQuery(
    { patientId },
    {
      skip: !patientId,
    }
  );
  console.log(appointments);
  const {
    data: patient,
    isErrorPatient,
    isLoadingPatient,
  } = useGetPatientByIdQuery(patientId, {
    skip: !patientId,
  });
  console.log(patient);
  if (isLoading || isLoadingPatient) return <Spinner />;
  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isErrorPatient) return <div>Error: {isErrorPatient.toString()}</div>;

  const getPatientPhoto = (patient) => {
    if (patient?.photo && patient.photo !== "null" && patient.photo !== "") {
      return patient.photo;
    }
    return patient?.gender === 2
      ? "/images/male.png"
      : patient?.gender === 1
      ? "/images/female.png"
      : "/images/agender.png";
  };

  const getDoctorPhoto = (doctor) => {
    if (doctor?.photo && doctor.photo !== "null" && doctor.photo !== "") {
      return doctor.photo;
    }
    return "/images/doctor.png";
  };

  const patientName = `${patient?.name} ${patient?.surname}`;

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Canceled";
      case 3:
        return "Finished";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <div className="xl:px-8 px-2">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/patients">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {patient.bloodGroup !== null && patient.bloodGroup !== "" ? (
                  <BloodType bloodType={patient.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">{patientName}</h1>
              <p className="text-xs text-gray-500">{patient.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={getPatientPhoto(patient)}
            alt={`${patientName}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-center">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">{patientName}</h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 px-2 xl:px-12 w-full">
              <PatientStickyLink
                id={patientId}
                patientId={patientId}
                patientName={patientName}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold">
                Patient Appointments List
              </h2>
              <ul>
                {appointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="flex justify-between p-4 border-b">
                    <span>
                      {format(
                        new Date(appointment.appointmentDate),
                        "yyyy-MM-dd"
                      )}
                    </span>
                    <span>
                      {format(
                        `${appointment.appointmentDate.substring(0, 10)}T${
                          appointment.appointmentTime
                        }`,
                        "HH:mm"
                      )}
                    </span>
                    <span>{appointment.doctorFullName}</span>
                    <span>{appointment.branchName}</span>
                    <span>{getStatusLabel(appointment.status)}</span>
                  </li>
                ))}
              </ul>
              {appointments.length === 0 && <p>No appointments found.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentProfile;
