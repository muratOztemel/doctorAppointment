import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuthHandler } from "../../components/hooks/useAuthHandler";
import useTokenExpirationHandler from "../../components/hooks/useTokenExpirationHandler";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useSelector((state) => state.users.userLogin);
  const token = localStorage.getItem("token");
  const isCheckingToken = useAuthHandler(); // Token kontrolü burada yapılacak
  useTokenExpirationHandler(); // Token süresi kontrolü burada yapılacak

  if (isCheckingToken) {
    return <div>Loading...</div>; // Token kontrolü yapılırken yükleme ekranı
  }

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
