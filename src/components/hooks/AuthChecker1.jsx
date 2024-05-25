import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";
import { setPatientId } from "../../redux/slices/patientSlice";
import { setDoctorId } from "../../redux/slices/doctorsSlice";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { useVerifyToken } from "./useVerifyToken";

export function useAuthChecker() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { isError, isLoading } = useVerifyToken(token);

  useEffect(() => {
    if (token && !isLoading) {
      if (isError) {
        // If token verification failed, clear the user and redirect to login
        console.error("Token verification failed");
        dispatch(clearUser());
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        let userRole =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        const primarysid =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"
          ];

        const groupSid =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid"
          ];

        const userId =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
          ];

        const username =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ];

        if (userRole === "Patient") {
          dispatch(setPatientId(groupSid));
          dispatch(
            setUserLogin({
              userId,
              username,
              token,
              userRole,
            })
          );
        }

        if (userRole === "Doctor") {
          dispatch(setDoctorId(primarysid));
          dispatch(
            setUserLogin({
              userId,
              username,
              token,
              userRole,
            })
          );
        }

        if (userRole === "Admin") {
          dispatch(
            setUserLogin({
              userId,
              username,
              token,
              userRole,
            })
          );
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        dispatch(clearUser());
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, token, isLoading, isError]);

  return null;
}
