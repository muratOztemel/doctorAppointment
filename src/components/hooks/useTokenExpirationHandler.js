import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearUser } from "../../redux/slices/usersSlice";
import { useRefreshTokenMutation } from "../../redux/features/api/apiSlice";

const useTokenExpirationHandler = () => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const now = Date.now();
      const timeUntilExpiration = expirationTime - now;

      if (timeUntilExpiration > 0) {
        const timeout = setTimeout(async () => {
          try {
            const result = await refreshToken().unwrap();

            if (!result) {
              throw new Error("Token refresh failed");
            }

            const newToken = result.token;
            localStorage.setItem("token", newToken);
          } catch (error) {
            dispatch(clearUser());
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }
        }, timeUntilExpiration - 5 * 60 * 1000);

        return () => clearTimeout(timeout);
      } else {
        dispatch(clearUser());
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }
  }, [dispatch, refreshToken]);
};

export default useTokenExpirationHandler;
