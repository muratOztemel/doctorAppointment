import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";
import { setPatientId } from "../../redux/slices/patientSlice";
import { setDoctorId } from "../../redux/slices/doctorsSlice";

export function useAuthHandler() {
  const dispatch = useDispatch();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const { exp } = decodedToken;
          const now = Date.now() / 1000;

          if (exp < now) {
            throw new Error("Token expired");
          }

          const userRole =
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
          } else if (userRole === "Doctor") {
            dispatch(setDoctorId(primarysid));
          }

          dispatch(
            setUserLogin({
              userId,
              username,
              token,
              userRole,
            })
          );
        } catch (error) {
          console.error("Session restore failed:", error);
          dispatch(clearUser());
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
      } else {
        dispatch(clearUser());
      }

      setIsCheckingToken(false);
    };

    checkToken();
  }, [dispatch, token]);

  return isCheckingToken;
}
