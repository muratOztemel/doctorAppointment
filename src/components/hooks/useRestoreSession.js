import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRestoreSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        /*         toast("Giriş Başarılı. Yönetim Paneline Yönlendiriliyorsunuz!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        }); */
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
