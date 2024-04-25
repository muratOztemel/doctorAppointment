import { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetUserRolesQuery,
} from "../../../redux/features/api/apiSlice";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import UserModal from "./UserModal1";
import ConfirmModal from "./ConfirmModal";

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const {
    data: roles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useGetRolesQuery();
  const {
    data: userRoles,
    error: userRolesError,
    isLoading: userRolesLoading,
  } = useGetUserRolesQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  if (isLoading || rolesLoading || userRolesLoading) return <p>Loading...</p>;
  if (isError || rolesError || userRolesError)
    return <p>Error loading data.</p>;

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete).unwrap();
      setUserToDelete(null); // Clean ID
      setShowConfirmModal(false); // Close to Modal
    }
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  const handleEdit = (user) => {
    const userRole = userRoles.find((ur) => ur.userId === user.id);
    const roleDetails = roles.find((role) => role.id === userRole?.roleId);
    setSelectedUser({ ...user, role: roleDetails });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setSelectedUser({ name: "", id: null });
    setIsAddingNew(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading roles.</p>;
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
                onClick={handleAddNew}
                className="w-40 h-20 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white text-lg">
                Add New User
              </button>
            </div>
            <div>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th className="cursor-pointer hover:bg-cyan-300">ID</th>
                    <th className="cursor-pointer hover:bg-cyan-300">Name</th>
                    <th className="cursor-pointer hover:bg-cyan-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
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
                        setRoleId(userRole.roleId)
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
              {(selectedUser || isAddingNew) && (
                <div>
                  <UserModal
                    user={selectedUser}
                    onClose={() => {
                      setSelectedUser(null);
                      setIsAddingNew(false);
                    }}
                    isAddingNew={isAddingNew}
                    roles={roles}
                  />
                </div>
              )}

              {showConfirmModal && (
                <div>
                  <ConfirmModal
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleDeleteConfirm}
                    message="Are you sure you want to delete this user?"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
