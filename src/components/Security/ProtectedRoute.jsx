import { Navigate } from "react-router-dom";
import { node } from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Eğer token yoksa, kullanıcıyı /login sayfasına yönlendir
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: node,
};
