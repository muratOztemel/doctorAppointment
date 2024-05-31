import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/api/apiSlice";
import TitleCard from "../../components/UI/Cards/TitleCard";
import Card from "../UI/Cards/Card";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PatientSettings = () => {
  const { userId, username } = useSelector((state) => state.users.userLogin);
  const { data: userData, isError, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [editEmail, setEditEmail] = useState(false);

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

  useEffect(() => {
    if (userData) {
      emailFormik.setValues({ email: userData.userName });
    }
  }, [userData]);

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

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"S E T T I N G S"} />
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-12 w-full">
          <Card
            title={"Change Password"}
            icon={<MdOutlinePassword />}
            color={"green"}
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
                disabled={isLoading || isUpdating}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Change Password
              </button>
            </form>
          </Card>

          <Card
            title={"Change Email"}
            icon={<MdEmail />}
            color={"green"}
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
        <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
};

export default PatientSettings;
