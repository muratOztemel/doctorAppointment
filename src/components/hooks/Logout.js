import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.removeItem("token");
  dispatch(clearUser());

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);
};
