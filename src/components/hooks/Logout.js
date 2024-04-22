import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  useDispatch(setUserLogin({ userId: null, username: "", token: "" }));

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);
};
