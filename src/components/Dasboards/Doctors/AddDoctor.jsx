import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useGetBranchesQuery } from "../../../redux/features/api/apiSlice.js";
import Card from "../../../components/UI/Cards/Card.jsx";
import { FaUserDoctor } from "react-icons/fa6";
import TitleCard from "../../../components/UI/Cards/TitleCard.jsx";
import DoctorForm from "./DoctorForm.jsx";
import DoctorUserForm from "./DoctorUserForm.jsx";

const AddDoctor = () => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.users);

  const { data: branches, error, isLoading } = useGetBranchesQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D O C T O R S"} />
        <Card
          title={"Add Doctor"}
          icon={<FaUserDoctor />}
          color={"cyan"}
          className="mt-5">
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-5">
            {/* <DoctorForm branches={branches} userId={userId} /> */}
            <DoctorUserForm />
          </div>
        </Card>
      </div>
    </>
  );
};
export default AddDoctor;
