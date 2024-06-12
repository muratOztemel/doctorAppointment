import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetDoctorByIdQuery } from "../../../redux/features/api/apiSlice.js";
import Spinner from "../../UI/Spinner.jsx";
import { FaRegCalendarDays, FaUser, FaUserDoctor } from "react-icons/fa6";
import BloodType from "../Services/BloodType.jsx";
import { RiLockPasswordLine } from "react-icons/ri";

import {
  useGetBranchesQuery,
  useGetDoctorInfoByDoctorIdQuery,
} from "../../../redux/features/api/apiSlice.js";
import DoctorStickyLink from "../Services/DoctorStickyLink.jsx";

const DoctorHolidays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id: doctorId } = useParams();
  doctorId = Number(doctorId);
  const { data: doctor, isError, isLoading } = useGetDoctorByIdQuery(doctorId);
  const {
    data: doctorInfo,
    isDoctorInfoError,
    isDoctorInfoLoading,
  } = useGetDoctorInfoByDoctorIdQuery(doctorId);

  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();

  if (isLoading || !branches || isDoctorInfoLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isDoctorInfoError) {
    return <div>Error loading the doctor s data!</div>;
  }

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  const doctorName = `${doctor?.name} ${doctor?.surname}`;

  return (
    <>
      <div className="xl:px-8 px-2">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/doctors">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {doctor.bloodGroup !== null && doctor.bloodGroup !== "" ? (
                  <BloodType bloodType={doctor.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">{doctorName}</h1>
              <p className="text-xs text-gray-500">
                {doctor?.doctorInfo?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={
              doctor?.doctorInfo?.photo !== "null" &&
              doctor?.doctorInfo?.photo !== null &&
              doctor?.doctorInfo?.photo !== ""
                ? doctor.doctorInfo.photo
                : ""
            }
            alt={doctorName}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">{doctorName}</h2>
              <p className="text-xs text-gray-500">{doctor.email}</p>
              <p className="text-xs">{doctor.phone}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 px-2 xl:px-12 w-full">
              <DoctorStickyLink doctorId={doctorId} doctorName={doctorName} />
            </div>
          </div>

          <div className="grid grid-cols-3  gap-3 lg:col-span-8 bg-white rounded-xl border-[1px] p-6">
            XXXX
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorHolidays;
