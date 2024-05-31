import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetDoctorWorkingDayByDoctorIdQuery,
  useUpdateDoctorWorkingDaysMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TitleCard from "../../components/UI/Cards/TitleCard";
import Card from "../../components/UI/Cards/Card";
import { IoSettingsOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const DashboardDoctorSettings = () => {
  const { doctorId } = useSelector((state) => state.doctors);
  const { userId } = useSelector((state) => state.users.userLogin);
  const {
    data: workingDays,
    isLoading,
    error,
  } = useGetDoctorWorkingDayByDoctorIdQuery(doctorId, {
    skip: !doctorId,
  });
  const [updateDoctorWorkingDays] = useUpdateDoctorWorkingDaysMutation();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [selectedDays, setSelectedDays] = useState([]);

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

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

  useEffect(() => {
    if (userData) {
      emailFormik.setValues({ email: userData.userName });
    }
  }, [userData]);

  const handleDayToggle = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
    formik.setFieldValue("days", newSelectedDays);
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
        console.log(result);
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
        console.error("Çalışma günleri güncellenirken hata oluştu:", error);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await updateUser({
          id: userId,
          updatedUser: {
            id: userId,
            email: userData.userName,
            password: values.password,
            status: true,
          },
        });
        console.log(result);
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
        console.log(error);
      }
    },
  });

  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      await updateUser({
        id: userId,
        updatedUser: {
          id: userId,
          email: values.email,
          password: userData.password,
          status: true,
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
    },
  });

  if (isLoading || isLoadingUser) return <div>Yükleniyor...</div>;
  if (error || errorUser)
    return <div>Hata oluştu: {error ? error.message : errorUser.message}</div>;

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
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"M Y - S E T T I N G S"} />
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-12 w-full">
          <Card
            title={"My Working Days"}
            icon={<IoSettingsOutline />}
            color={"cyan"}
            className={"mb-6"}>
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
          </Card>

          <Card
            title={"Change Password"}
            icon={<IoSettingsOutline />}
            color={"cyan"}
            className={"mb-6"}>
            <form
              onSubmit={passwordFormik.handleSubmit}
              className="my-6 w-full h-full gap-7 flex flex-col">
              <label className="w-full">
                New Password:
                <input
                  type="password"
                  name="password"
                  value={passwordFormik.values.password}
                  onChange={passwordFormik.handleChange}
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                disabled={isLoading || isLoadingUser || isUpdating}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Change Password
              </button>
            </form>
          </Card>

          <Card
            title={"Change Email"}
            icon={<IoSettingsOutline />}
            color={"cyan"}
            className={"mb-6"}>
            <form
              onSubmit={emailFormik.handleSubmit}
              className="my-6 w-full h-full gap-7 flex flex-col">
              <label className="w-full">
                New Email:
                <input
                  type="email"
                  name="email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Change Email
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctorSettings;
