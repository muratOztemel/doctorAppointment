import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useVerifyTokenMutation } from "../../redux/features/api/apiSlice";
import { clearUser, setUserLogin } from "../../redux/slices/usersSlice";

const useTokenExpirationHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Milisaniyeye çevir
      const now = Date.now();
      const timeUntilExpiration = expirationTime - now;

      if (timeUntilExpiration > 0) {
        const timeout = setTimeout(async () => {
          const { isError } = useVerifyTokenMutation(undefined, {
            skip: !token,
          });

          if (isError) {
            dispatch(clearUser());
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }
        }, timeUntilExpiration - 5 * 60 * 1000); // Süre dolmadan 5 dakika önce yenile

        return () => clearTimeout(timeout);
      } else {
        dispatch(clearUser());
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }
  }, [dispatch]);
};

export default useTokenExpirationHandler;
