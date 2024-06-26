import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetPatientByIdQuery,
  useGetAppointmentsByPatientAndDateQuery,
} from "../../../redux/features/api/apiSlice.js";
import BloodType from "../Services/BloodType.jsx";
import { format } from "date-fns";
import PatientStickyLink from "../Services/PatientStickyLink.jsx";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, pid: patientId } = useParams();
  const selectedDate = new Date().toISOString().split("T")[0]; // Set the selected date to today

  const {
    data: appointments,
    isLoading: isLoadingAppointment,
    isError: isErrorAppointment,
  } = useGetAppointmentsByPatientAndDateQuery(
    { patientId },
    {
      skip: !patientId,
    }
  );

  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);

  if (isLoading || isLoadingAppointment) return <p>Loading...</p>;
  if (isError || isErrorAppointment) return <p>Error fetching patient.</p>;

  const patientName = `${patient.name} ${patient.surname}`;

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
            src={
              patient.photo !== "null" &&
              patient.photo !== null &&
              patient.photo !== ""
                ? patient.photo
                : patient.gender === 2
                ? "/images/male.png"
                : patient.gender === 1
                ? "/images/female.png"
                : "/images/agender.png"
            }
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
                id={id}
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
                    <span>{appointment.status}</span>
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

export default PatientProfile;
