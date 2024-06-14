import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetDoctorByIdQuery,
  useGetDoctorWorkingDayByDoctorIdQuery,
  useUpdateDoctorWorkingDaysMutation,
} from "../../../redux/features/api/apiSlice.js";
import Spinner from "../../UI/Spinner.jsx";
import BloodType from "../Services/BloodType.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetBranchesQuery,
  useGetDoctorInfoByDoctorIdQuery,
} from "../../../redux/features/api/apiSlice.js";
import DoctorStickyLink from "../Services/DoctorStickyLink.jsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const DoctorWorkingDays = () => {
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

  const {
    data: workingDays,
    isLoadingDays,
    isErrorDays,
  } = useGetDoctorWorkingDayByDoctorIdQuery(doctorId, {
    skip: !doctorId,
  });
  const [updateDoctorWorkingDays] = useUpdateDoctorWorkingDaysMutation();
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (workingDays) {
      setSelectedDays(workingDays.days.split(",").map(Number));
      formik.setValues({
        startTime: workingDays.startTime,
        endTime: workingDays.endTime,
        slotDuration: workingDays.slotDuration,
      });
    }
  }, [workingDays]);

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      formik.setFieldValue(
        "days",
        selectedDays.filter((d) => d !== day)
      );
    } else {
      if (selectedDays.length < 5) {
        setSelectedDays([...selectedDays, day]);
        formik.setFieldValue("days", [...selectedDays, day]);
      } else {
        toast.error("You cannot select more than 5 days.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      startTime: "",
      endTime: "",
      slotDuration: "",
      days: [],
    },
    validationSchema: Yup.object({
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
      slotDuration: Yup.string().required("Slot duration is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await updateDoctorWorkingDays({
          id: workingDays.id,
          updatedDoctorWorkingDays: {
            id: workingDays.id,
            doctorId,
            days: selectedDays.join(","),
            startTime: values.startTime,
            endTime: values.endTime,
            slotDuration: values.slotDuration,
          },
        });

        toast.success("Your transaction has been completed successfully.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error updating working days:", error);
      }
    },
  });

  if (isLoading || !branches || isDoctorInfoLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isDoctorInfoError) {
    return <div>Error loading the doctor's data!</div>;
  }

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  const doctorName = `${doctor?.name} ${doctor?.surname}`;
  const daysOfWeek = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
    { id: 7, label: "Sunday" },
  ];

  const inputClass =
    "block w-full h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

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

          <div className="flex  gap-3 lg:col-span-8 bg-white rounded-xl border-[1px] p-6">
            <form
              onSubmit={formik.handleSubmit}
              className="my-6 w-full h-full gap-7 flex flex-col">
              <div className="flex flex-row gap-4 mb-4 items-center">
                <label>
                  Start Time:
                  <input
                    type="text"
                    name="startTime"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    placeholder="Start Time"
                    className={inputClass}
                  />
                </label>
                <label>
                  End Time:
                  <input
                    type="text"
                    name="endTime"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    placeholder="End Time"
                    className={inputClass}
                  />
                </label>
                <label>
                  Slot Duration:
                  <input
                    type="text"
                    name="slotDuration"
                    value={formik.values.slotDuration}
                    onChange={formik.handleChange}
                    placeholder="Slot Duration"
                    className={inputClass}
                  />
                </label>
              </div>
              <div className="flex gap-4 flex-wrap">
                {daysOfWeek.map((day) => (
                  <button
                    type="button"
                    key={day.id}
                    className={`px-4 py-2 rounded ${
                      selectedDays.includes(day.id)
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => handleDayToggle(day.id)}>
                    {day.label}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Confirm Working Days
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorWorkingDays;
