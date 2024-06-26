import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import { useGetFavoritesByUserIdQuery } from "../../redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import PatientFavoriteList from "./PatientFavoriteList";

const PatientFavoriteDoctors = () => {
  const { userId } = useSelector((state) => state.users.userLogin);
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useGetFavoritesByUserIdQuery(userId, {
    skip: !userId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading favorite doctors.</p>;
  }

  const activeFavorites = favorites.filter(
    (favorite) => favorite.favoriteStatus
  );

  return (
    <Card
      title={"My Favorite Doctors"}
      icon={<TbClockRecord />}
      color={"cyan"}
      className={"mb-6"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {activeFavorites.length > 0 ? (
          activeFavorites.map((favorite) => (
            <PatientFavoriteList
              key={favorite.favoriteId}
              favorite={favorite}
            />
          ))
        ) : (
          <p>No favorite doctors found.</p>
        )}
      </div>
    </Card>
  );
};

export default PatientFavoriteDoctors;
