import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin } from "./redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";

const SecurityComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Rol bazlı yönlendirme
        switch (decodedToken.role) {
          case "Admin":
            dispatch(
              setUserLogin({
                token: token,
                userRole: decodedToken.role,
                userId: decodedToken.sid,
              })
            );
            navigate("/dashboardAdmin");
            break;
          case "Patient":
            dispatch(
              setUserLogin({
                token: token,
                userRole: decodedToken.role,
                userId: decodedToken.groupsid,
              })
            );
            navigate("/dashboardPatient");
            break;
          default:
            navigate("/auth/login"); // Varsayılan olarak login sayfasına yönlendir
        }
      } catch (error) {
        console.error("Token decoding failed", error);
        navigate("/auth/login"); // Token geçersiz ise login sayfasına yönlendir
      }
    }
  }, [dispatch, navigate]);

  return null;
};

export default SecurityComponent;
