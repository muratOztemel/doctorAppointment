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

const UsersList = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: roles, isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: userRoles, isLoading: isLoadingUserRoles } =
    useGetUserRolesQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (isLoadingUsers || isLoadingRoles || isLoadingUserRoles) {
    return <div>Loading...</div>;
  }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsAddingNew(false);
  };

  const handleDelete = async (id) => {
    await deleteUser(id).unwrap();
  };

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"U S E R S"} />
      <Card
        title={"User List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <div className="flex gap-4 mt-5">
          <div className="flex justify-around gap-10">
            <div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setIsModalOpen(true);
                  setIsAddingNew(true);
                }}
                className="w-40 h-20 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white text-lg">
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
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {user.id}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {user.userName}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
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
                          onClick={() => handleDelete(user.id)}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <img
                            src="/images/delete.png"
                            alt="detail"
                            className="h-4 mr-2"
                          />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gab-6">
              {isModalOpen && (
                <UserModal
                  user={selectedUser}
                  roles={roles}
                  onClose={() => setIsModalOpen(false)}
                  isAddingNew={isAddingNew}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
