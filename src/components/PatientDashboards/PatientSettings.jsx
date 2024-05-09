import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/api/apiSlice";
import TitleCard from "../../components/UI/Cards/TitleCard";
import Card from "../UI/Cards/Card";
import { FaUserInjured } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PatientSettings = () => {
  const { userId, username } = useSelector((state) => state.users.userLogin);
  const { data: user, isError, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [editEmail, setEditEmail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      // Update password logic here
      await updateUser({
        id: user.id,
        updatedUser: {
          id: user.id,
          email: values.email,
          password: values.newPassword, // Assuming API accepts direct password update
        },
      });
      toast.success("Profile updated successfully.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setEditEmail(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues((prev) => ({
        ...prev,
        email: user.userName,
      }));
    }
  }, [user]);

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"S E T T I N G S"} />
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-12 w-full">
          <Card
            title={"My settings"}
            icon={<FaUserInjured />}
            color={"cyan"}
            className={"mb-6"}>
            <div className="relative my-6 max-w-md mx-auto h-full">
              <h2 className="text-lg font-bold text-cyan-700 mb-10">
                Change Login Information
              </h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                  <div>
                    <label htmlFor="email">Email:</label>
                    <div className="flex items-center">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                        disabled={!editEmail}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <small className="text-red-600">
                          {formik.errors.email}
                        </small>
                      )}
                      <button
                        type="button"
                        onClick={() => setEditEmail(!editEmail)}
                        className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                        {editEmail ? "Lock" : "Edit"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.currentPassword}
                      className="block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {formik.touched.currentPassword &&
                      formik.errors.currentPassword && (
                        <small className="text-red-600">
                          {formik.errors.currentPassword}
                        </small>
                      )}
                  </div>
                  <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      className="block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {formik.touched.newPassword &&
                      formik.errors.newPassword && (
                        <small className="text-red-600">
                          {formik.errors.newPassword}
                        </small>
                      )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">
                      Confirm New Password:
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className="block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <small className="text-red-600">
                          {formik.errors.confirmPassword}
                        </small>
                      )}
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    disabled={isLoading || isUpdating}
                    className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-sm px-4 py-2 text-center">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
        <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
};

export default PatientSettings;
