import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetPatientByIdQuery } from "../../../redux/features/api/apiSlice";
import { setPatientId } from "../../../redux/slices/tablePatientsSlice.js";
import Spinner from "../../UI/Spinner";
import {
  FaBoxArchive,
  FaRegCalendarDays,
  FaUser,
  FaHeartPulse,
} from "react-icons/fa6";
import BloodType from "../Services/BloodType.jsx";

const AddMedical = () => {
  const navigate = useNavigate();
  const { patientId } = useSelector((state) => state.tablePatients);
  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="xl:px-8 px-2 pt-24">
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
              <h1 className="text-xl font-semibold">
                {patient.name} {patient.surname}
              </h1>
              <p className="text-xs text-gray-500">+254 712 345 678</p>
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
            alt={`${patient.name} ${patient.surname}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {patient.name} {patient.surname}
              </h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col gap-3 px-2 xl:px-12 w-full">
              <button className="bg-cyan-50 text-cyan-500 text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaBoxArchive /> Medical Records
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaRegCalendarDays />
                Appointments
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaUser /> Patient information
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaHeartPulse />
                Health information
              </button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
            <div className="flex flex-col gap-3">
              <label>Doctors</label>
              <select>
                <option value="Doctor Name 1">Doctor Name 1</option>
                <option value="Doctor Name 2">Doctor Name 2</option>
              </select>
              <label>Complains</label>
              <textarea
                rows="3"
                className="focus:border-cyan-500 w-full bg-transparent text-sm mt-3 p-4 border border-cyan-300 rounded font-light"></textarea>
              <label>Diagnosis</label>
              <textarea
                rows="3"
                className="focus:border-cyan-500 w-full bg-transparent text-sm mt-3 p-4 border border-cyan-300 rounded font-light"></textarea>
              <label>Vital Signs</label>
              <textarea
                rows="3"
                className="focus:border-cyan-500 w-full bg-transparent text-sm mt-3 p-4 border border-cyan-300 rounded font-light"></textarea>
              <label>Medicine</label>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Dosage</th>
                    <th>Instraction</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paracetamol</td>
                    <td>1000</td>
                    <td>1 - M/A/E </td>
                    <td>1</td>
                    <td>1000</td>
                    <td>
                      <button className="flex justify-center items-center text-sm bg-red-300 hover:bg-red-500 hover:text-amber-500 text-white border-red-50 border-opacity-5 hover:border-red-500 rounded-md w-2/4 md:w-8 h-8">
                        <img
                          src="/images/delete.png"
                          alt="detail"
                          className="h-4"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className=" text-cyan-500 flex flex-rows justify-center items-center gap-2 rounded-lg border border-cyan-500 border-dashed py-4 w-full text-sm">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                </svg>{" "}
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMedical;
