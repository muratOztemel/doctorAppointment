import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Spinner from "../UI/Spinner";
import DefaultImage from "../hooks/DefaultImage";

import {
  useGetBranchByIdQuery,
  useGetDoctorInfoByDoctorIdQuery,
  useGetDoctorByIdQuery,
} from "../../redux/features/api/apiSlice";
import Card from "../UI/Cards/Card";
import { IoMdInformationCircleOutline } from "react-icons/io";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const { data: doctor, isError, isLoading } = useGetDoctorByIdQuery(doctorId);
  const {
    data: doctorInfo,
    isDoctorInfoError,
    isDoctorInfoLoading,
  } = useGetDoctorInfoByDoctorIdQuery(doctorId);

  const { data: branch, isLoading: isLoadingBranch } = useGetBranchByIdQuery(
    doctor?.branchId
  );

  if (isLoading || isLoadingBranch || isDoctorInfoLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isDoctorInfoError) {
    return <div>Error loading the doctor s data!</div>;
  }

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="xl:px-8 px-2 ">
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
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">
                {doctor.name} {doctor.surname}
              </h1>
              <p className="text-xs text-gray-500">{branch?.name}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={DefaultImage(doctor?.doctorInfo)}
            alt={`${doctor?.name} ${doctor?.surname}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover bg-white border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>
        <Card
          title={"Doctor Information"}
          icon={<IoMdInformationCircleOutline className="text-2xl" />}
          color={"green"}
          className={"mt-6"}>
          <div className="w-full p-10 flex flex-col gap-2">
            <div className="flex">
              <p className="text-3xl font-medium">
                {doctor?.title} {doctor?.name} {doctor?.surname}
              </p>
            </div>
            <div>
              <p className="text-xl font-medium text-gray-500">
                {branch?.name}
              </p>
            </div>
            <div>
              <p className="text-base text-gray-400">
                {doctor?.doctorInfo?.education}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Languages
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.language}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Experience
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.experience}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Education
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.education}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Members
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.members}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Articles
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.articles}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-cyan-500 mt-6">
                Biography
              </h3>
            </div>
            <div>
              <p>{doctor?.doctorInfo?.about}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DoctorProfile;
