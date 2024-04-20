import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useRestoreSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const adminUserId =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/sid"
          ];

        const patientUserId =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid"
          ];
        console.log(patientUserId);
        dispatch(
          setUserLogin({
            token,
            userRole,
            userId: userRole === "Admin" ? adminUserId : patientUserId,
          })
        );

        navigate(
          userRole === "Admin" ? "/dashboardAdmin" : "/dashboardPatient"
        );
      } catch (error) {
        console.error("Session restore failed:", error);
        navigate("/auth/login");
      }
    }
  }, [dispatch, navigate]);
};
