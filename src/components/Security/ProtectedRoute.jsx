import { useEffect } from "react";
import { array } from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole } = useSelector((state) => state.users.userLogin);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login"); // Token yoksa kullanıcıyı giriş sayfasına yönlendir
    } else if (!allowedRoles.includes(userRole)) {
      navigate("/unauthorized"); // Kullanıcının rolü izin verilenler arasında değilse yetkisiz sayfasına yönlendir
    }
  }, [navigate, allowedRoles, token, userRole]);

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: array.isRequired,
};

export default ProtectedRoute;
