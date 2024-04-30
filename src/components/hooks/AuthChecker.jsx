import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";

export function useAuthChecker() {
  const dispatch = useDispatch();

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

        dispatch(
          setUserLogin({
            token,
            userRole,
            userId: userRole === "Admin" ? adminUserId : patientUserId,
          })
        );
      } catch (error) {
        console.error("Session restore failed:", error);
      }
    } else {
      dispatch(clearUser());
    }

    return () => token;
  }, [dispatch]);

  return null;
}
