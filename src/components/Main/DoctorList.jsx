import { useGetDoctorsQuery } from "../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctors</p>;

  return (
    <div className="relative w-full max-w-[1280px] mx-auto overflow-hidden p-5">
      <div className="text-2xl font-medium mb-4">Our Doctors</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <Link
            to={`/doctor/${doctor.id}`}
            key={doctor.id}
            className="block border p-4 rounded hover:shadow-lg">
            <img
              src={doctor.doctorInfo.photo}
              alt={`${doctor.name} ${doctor.surname}`}
              className="w-full h-48 object-cover object-top mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">
              {doctor.title} {doctor.name} {doctor.surname}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
