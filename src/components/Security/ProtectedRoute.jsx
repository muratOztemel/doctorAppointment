import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useSelector((state) => state.users.userLogin);
  const token = localStorage.getItem("token");

  if (!token) {
    // User is not authenticated
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // User does not have the required role
    return <Navigate to="/unauthorized" />;
  }

  // User is authenticated and has the required role
  return children;
};

export default ProtectedRoute;
