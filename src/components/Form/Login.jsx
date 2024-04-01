import { useAuthenticationMutation } from "../../redux/features/api/apiSlice";
import Spinner from "../UI/Spinner";

const Login = () => {
  const { data, isError, isLoading } = useAuthenticationMutation();

  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isLoading) return <Spinner />;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-20">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={(e) => e.target.value} />
        <input type="text" name="password" onChange={(e) => e.target.value} />
        <button>Ekle</button>
      </form>
    </div>
  );
};
export default Login;
