import { useDispatch, useSelector } from "react-redux";
import { useAuthenticationMutation } from "../../redux/features/api/apiSlice";
import Spinner from "../UI/Spinner";
import { setUsersLogin } from "../../redux/slices/usersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [authentication, { data, isError, isLoading }] =
    useAuthenticationMutation();

  const { userLogin } = useSelector((state) => state.users);

  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isLoading) return <Spinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const modelData = {
        username: "ali@makinaburada.net", //"murat@makinaarabul.com",
        password: "123456",
      };

      let result = await authentication(modelData);

      dispatch(
        setUsersLogin({
          username: modelData.username,
          password: modelData.password,
          token: result.data.accessToken,
        })
      );
    } catch (err) {
      console.error("Error adding new product:", err);
    }
  };
  console.log(userLogin);
  return (
    <div className="mt-20">
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={(e) => e.target.value} />
        <input type="text" name="password" onChange={(e) => e.target.value} />
        <button>Login</button>
      </form>
    </div>
  );
};
export default Login;
