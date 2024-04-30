import React, { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetUserRolesQuery,
} from "../../../redux/features/api/apiSlice";
import UserModal from "./UserModal";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import ConfirmModal from "./ConfirmModal";
import AddDoctorModal from "./AddDoctorModal";
import AddDoctorForm from "./AddDoctorForm";

const UsersList = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: roles, isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: userRoles, isLoading: isLoadingUserRoles } =
    useGetUserRolesQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToAddDoctor, setUserToAddDoctor] = useState(null);

  if (isLoadingUsers || isLoadingRoles || isLoadingUserRoles) {
    return <div>Loading...</div>;
  }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsAddingNew(false);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete).unwrap();
      setUserToDelete(null); // ID'yi temizle
      setShowConfirmModal(false); // Modalı kapat
    }
  };

  const handleAddDoctor = (user) => {
    setSelectedUser(user);
    setShowAddDoctorModal(true);
  };

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"U S E R S"} />
      <Card
        title={"User List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5 p-2">
        <div className="container gap-4 mt-5">
          <div className="flex flex-col justify-around gap-10">
            <div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setIsModalOpen(true);
                  setIsAddingNew(true);
                }}
                className="w-40 h-9 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white text-lg flex justify-center items-center">
                <IoMdAddCircle className="mr-2" />
                Add New User
              </button>
            </div>
            <div>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th className="cursor-pointer hover:bg-cyan-300">ID</th>
                    <th className="cursor-pointer hover:bg-cyan-300">
                      UserName
                    </th>
                    <th className="cursor-pointer hover:bg-cyan-300">Role</th>
                    <th className="cursor-pointer hover:bg-cyan-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                      <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                        {user.id}
                      </td>
                      <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                        {user.userName}
                      </td>
                      <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                        {roles && userRoles
                          ? roles.find(
                              (role) =>
                                role.id ===
                                userRoles.find(
                                  (userRole) => userRole.userId === user.id
                                )?.roleId
                            )?.name || "No role"
                          : "Loading roles..."}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                        <button
                          onClick={() => handleEdit(user)}
                          className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <img
                            src="/images/eye.png"
                            alt="detail"
                            className="h-7 mr-2"
                          />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <img
                            src="/images/delete.png"
                            alt="detail"
                            className="h-4 mr-2"
                          />
                          Delete
                        </button>
                        <button
                          onClick={() => handleAddDoctor(user)}
                          className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <IoMdAddCircle className="mr-2" />
                          Add Doctor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isModalOpen && (
              <UserModal
                user={selectedUser}
                roles={roles}
                onClose={() => setIsModalOpen(false)}
                isAddingNew={isAddingNew}
              />
            )}
            {showConfirmModal && (
              <ConfirmModal
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete this user?"
              />
            )}
            {showAddDoctorModal && (
              <AddDoctorForm
                onClose={() => setShowAddDoctorModal(false)}
                user={selectedUser}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
