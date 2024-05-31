import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useVerifyTokenQuery } from "../../redux/features/api/apiSlice";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";
import { setPatientId } from "../../redux/slices/patientSlice";
import { setDoctorId } from "../../redux/slices/doctorsSlice";

export function useAuthHandler() {
  const dispatch = useDispatch();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const token = localStorage.getItem("token");

  const { data, error, isError } = useVerifyTokenQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
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

    setIsCheckingToken(false); // Token kontrolü tamamlandı
  }, [dispatch, token, isError]);

  return isCheckingToken;
}
