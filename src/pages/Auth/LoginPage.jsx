import Login from "../../components/Form/Login/Login";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-300 text-gray-900 flex justify-center items-center">
      <div className="w-full max-w-4xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <Login />
        </div>

        <div className="flex-1 bg-slate-300 text-center hidden lg:flex sm:rounded-tr-lg sm:rounded-br-lg shadow">
          <div className="text-white flex justify-end text-5xl w-full bg-center bg-no-repeat bg-[url('/images/fotos/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg')] bg-cover sm:rounded-tr-lg sm:rounded-br-lg">
            <p className="mt-20 mr-16 font-serif">Login!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
