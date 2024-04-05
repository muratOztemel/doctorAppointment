import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetAppointmentByIdQuery,
  useGetPatientByIdQuery,
  useGetDoctorByIdQuery,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { setAppointmentId } from "../../../redux/slices/tableAppointmentsSlice.js";
import Spinner from "../../UI/Spinner";
import BranchesList from "../Branches/BranchesList.jsx";
import {
  FaBoxArchive,
  FaRegCalendarDays,
  FaUser,
  FaHeartPulse,
  FaUserDoctor,
} from "react-icons/fa6";
import { TbLockAccess } from "react-icons/tb";
import BloodType from "../Services/BloodType.jsx";
import { RiLockPasswordLine } from "react-icons/ri";

const AppointmentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointmentId } = useSelector((state) => state.tableAppointments);
  const { patientId } = useSelector((state) => state.tablePatients);
  const { doctorId } = useSelector((state) => state.doctors);
  const {
    data: appointment,
    isError,
    isLoading,
  } = useGetAppointmentByIdQuery(appointmentId);
  console.log(appointment);
  const {
    data: patient,
    isErrorPatient,
    isLoadingPatient,
  } = useGetPatientByIdQuery(patientId);
  console.log(patient);
  const {
    data: doctor,
    isErrorDoctor,
    isLoadingDoctor,
  } = useGetDoctorByIdQuery(appointment?.doctorId);

  if (isLoading || isLoadingPatient | isLoadingDoctor) return <Spinner />;
  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isErrorPatient) return <div>Error: {isErrorPatient.toString()}</div>;
  if (isErrorDoctor) return <div>Error: {isErrorDoctor.toString()}</div>;

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
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-24">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/appointments">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {patient?.bloodGroup ? (
                  <BloodType bloodType={patient.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">
                {appointment?.patientFullName}
              </h1>
              <p className="text-xs text-gray-500">{patient?.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={getPatientPhoto(patient)}
            alt={appointment.patientFullName}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-cyan-500 p-6 lg:sticky top-28 ">
            <div className="flex flex-col justify-center w-60 h-20 items-center border border-dashed border-cyan-500">
              <h2 className="text-sm font-semibold">
                {appointment?.patientFullName}
              </h2>
              <p className="text-xs text-gray-500">{patient?.email}</p>
              <p className="text-xs">{patient?.phone}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 px-2 xl:px-12 w-full">
              <div className="flex flex-col justify-center w-60 h-44 items-center border border-dashed border-cyan-500">
                <img
                  src={getPatientPhoto(doctor)}
                  alt={appointment.patientFullName}
                  className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
                />
                {appointment?.doctorFullName}
              </div>
              <div className="flex flex-col justify-center items-center gap-3 px-2 xl:px-12 w-full">
                <Link
                  to="/addMedical"
                  className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-48 p-4 rounded">
                  <FaUserDoctor />
                  Personal Information
                </Link>
                <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-48 p-4 rounded">
                  <FaUser />
                  Patients
                </button>
                <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-48 p-4 rounded">
                  <FaRegCalendarDays /> Appointments
                </button>
                <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-48 p-4 rounded">
                  <TbLockAccess />
                  Access Control
                </button>
                <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-48 p-4 rounded">
                  <RiLockPasswordLine />
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-cyan-500 p-6">
            <div className="w-full flex justify-between items-center gap-2 mb-8">
              <h1 className="text-md font-semibold">Edit Appointment</h1>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
                <div className="sm:col-span-10">
                  <div className="text-sm w-full">
                    <label className="text-black text-sm ">Patient Name</label>
                    <input
                      defaultValue={appointment.patientFullName}
                      className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500"
                    />
                  </div>
                </div>
                <button className="text-cyan-500 flex flex-row justify-center items-center border border-dashed border-cyan-500 text-sm py-3.5 sm:mt-6 sm:col-span-2 rounded">
                  <span className="text-sm mr-2">+ </span> Add
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="flex w-full flex-col gap-3">
                  <p className="text-black text-sm">Purpose of visit</p>
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <BranchesList branchId={doctor?.branchId} />
                    </div>
                  </div>
                </div>
                <div className="text-sm w-full">
                  <label className="text-black text-sm">Date of visit</label>
                  <div className="react-datepicker-wrapper">
                    <div className="react-datepicker__input-container">
                      <input
                        type="text"
                        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500"
                        defaultValue="04/03/2024"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="text-sm w-full">
                  <label className="text-black text-sm">Start time</label>
                  <div className="react-datepicker-wrapper">
                    <div className="react-datepicker__input-container">
                      <input
                        type="text"
                        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500"
                        defaultValue="7:00 AM"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm w-full">
                  <label className="text-black text-sm">End time</label>
                  <div className="react-datepicker-wrapper">
                    <div className="react-datepicker__input-container">
                      <input
                        type="text"
                        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500"
                        defaultValue="9:00 AM"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="flex w-full flex-col gap-3">
                  <p className="text-black text-sm">Doctor</p>
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <button
                        className="w-full"
                        id="headlessui-listbox-button-:r29:"
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        data-headlessui-state="">
                        <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500">
                          {appointment.doctorFullName}{" "}
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className="text-xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <p className="text-black text-sm">Status</p>
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <button
                        className="w-full"
                        id="headlessui-listbox-button-:r2b:"
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        data-headlessui-state="">
                        <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-cyan-500">
                          Status...{" "}
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className="text-xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm w-full">
                <label className="text-black text-sm">Description</label>
                <textarea
                  rows="5"
                  placeholder="He is not sure about the time"
                  className="focus:border-cyan-500 w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light "></textarea>
              </div>
              <div className="flex-col flex gap-8 w-full">
                <p className="text-black text-sm">Share with patient via</p>
                <div className="flex flex-wrap sm:flex-nowrap gap-4">
                  <div className="text-sm w-full flex flex-row items-center">
                    <label className="flex-colo cursor-pointer relative">
                      <input
                        type="checkbox"
                        name="email"
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <span className=" border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-cyan-500 bg-cyan-500">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="text-[10px] block text-white"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                      </span>
                    </label>
                    <p className="text-black text-xs ml-2">Email</p>
                  </div>
                  <div className="text-sm w-full flex flex-row items-center">
                    <label className="flex-colo cursor-pointer relative">
                      <input
                        type="checkbox"
                        name="sms"
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <span className=" border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-cyan-500 bg-cyan-500">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="text-[10px] block text-white"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                      </span>
                    </label>
                    <p className="text-black text-xs ml-2">WhatsApp</p>
                  </div>
                  <div className="text-sm w-full flex flex-row items-center">
                    <label className="flex-colo cursor-pointer relative">
                      <input
                        type="checkbox"
                        name="whatsapp"
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <span className="border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-gray-300 bg-white">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="text-[10px] hidden"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                      </span>
                    </label>
                    <p className="text-black text-xs ml-2">SMS</p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <button className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white text-sm p-4 rounded-lg font-light">
                  Discard
                </button>
                <button className="hover:bg-cyan-500 hover:text-white w-full flex flex-row justify-center items-center gap-4 hover:opacity-80 transitions bg-cyan-100 text-cyan-500 text-sm font-medium px-2 py-4 rounded">
                  Save
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="text-cyan-500 text-xl hover:text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentProfile;
