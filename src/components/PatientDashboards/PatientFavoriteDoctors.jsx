import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import { useGetFavoritesByIdQuery } from "../../redux/features/api/apiSlice";
import { useSelector } from "react-redux";

const PatientAppointments = () => {
  const { userId } = useSelector((state) => state.users.userLogin);
  console.log();
  const {
    data: favorites,
    isLoading,
    isError,
  } = useGetFavoritesByIdQuery({ userId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading favorite doctors.</p>;
  }

  return (
    <>
      <Card
        title={"My Favorite Doctors"}
        icon={<TbClockRecord />}
        color={"cyan"}
        className={"mb-6"}>
        <div className="my-6 w-full h-full gap-7 flex flex-col">
          <div className="flex justify-end">favorite doctors</div>
        </div>
      </Card>
    </>
  );
};

export default PatientAppointments;
