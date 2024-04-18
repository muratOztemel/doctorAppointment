import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link to={"/auth/login"} className="text-red-500">
        Login
      </Link>
    </div>
  );
};
export default HomePage;
