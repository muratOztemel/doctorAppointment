import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticationMutation } from "../../redux/features/api/apiSlice";
import { useNavigate } from "react-router";
import Spinner from "../UI/Spinner";
import { setUsersLogin } from "../../redux/slices/usersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authentication, { isError, isLoading }] = useAuthenticationMutation();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isLoading) return <Spinner />;

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authentication(loginInfo);

      if (result.data.accessToken) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem("token", result.data.accessToken);

        // Redux state'ini güncelle (gerekirse)
        dispatch(
          setUsersLogin({
            username: loginInfo.username,
            token: result.data.accessToken,
          })
        );
        // Formu temizle veya başka bir sayfaya yönlendir
        setLoginInfo({ username: "", password: "" }); // Parolayı hemen temizle
        // Yönlendirme veya başka bir işlem yap
        navigate("/"); // Anasayfaya yönlendirme
      }
    } catch (err) {
      console.error("Error user login:", err);
    }
  };

  return (
    <div className="mt-20">
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          value={loginInfo.username}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
