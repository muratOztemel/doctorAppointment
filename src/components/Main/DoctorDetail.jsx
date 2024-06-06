import { useParams } from "react-router-dom";
import { useGetDoctorsQuery } from "../../redux/features/api/apiSlice.js";

const DoctorDetail = () => {
  const { id } = useParams();
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctor details</p>;

  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="relative w-full max-w-[1280px] mx-auto overflow-hidden p-5">
      <div className="text-2xl font-medium mb-4">
        {doctor.title} {doctor.name} {doctor.surname}
      </div>
      <img
        src={doctor.doctorInfo.photo}
        alt={`${doctor.name} {doctor.surname}`}
        className="w-full h-72 object-contain object-left mb-4 rounded"
      />
      <div className="text-lg mb-2">
        <strong>Education:</strong> {doctor.doctorInfo.education}
      </div>
      <div className="text-lg mb-2">
        <strong>Experience:</strong> {doctor.doctorInfo.experience}
      </div>
      <div className="text-lg mb-2">
        <strong>About:</strong> {doctor.doctorInfo.about}
      </div>
      <div className="text-lg mb-2">
        <strong>Members:</strong> {doctor.doctorInfo.members}
      </div>
      <div className="text-lg mb-2">
        <strong>Articles:</strong> {doctor.doctorInfo.articles}
      </div>
    </div>
  );
};

export default DoctorDetail;
