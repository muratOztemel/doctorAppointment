import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";
import { setPatientId } from "../../redux/slices/patientSlice";
import { setDoctorId } from "../../redux/slices/doctorsSlice";

export function useAuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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

        // console.log("User Role:", userRole); // Add this line for debugging
        // console.log("Doctor ID:", primarysid); // Add this line for debugging
        // console.log("Patient ID:", groupSid); // Add this line for debugging
        // console.log("User ID:", userId); // Add this line for debugging
        // console.log("Username:", username); // Add this line for debugging

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
      }
    } else {
      dispatch(clearUser());
    }

    return () => token;
  }, [dispatch]);

  return null;
}
