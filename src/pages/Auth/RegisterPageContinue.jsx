import RegisterForm from "../../components/Form/RegisterContinue/RegisterForm";
import ProgressPage from "./ProgressPage";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-slate-300 text-gray-900 flex justify-center items-center">
      <div className="w-full max-w-4xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex flex-col gap-2 p-6">
        <div className="sm:pl-12 sm:pr-6">
          <ProgressPage status="registerForm" />
        </div>
        <div className="flex mt-4">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <RegisterForm />
          </div>
          <div className="flex-1 text-center hidden lg:flex sm:rounded-tr-lg sm:rounded-br-lg shadow mr-6">
            <div className="text-white flex justify-end text-5xl w-full bg-center bg-no-repeat bg-[url('/images/fotos/owen-beard-DK8jXx1B-1c-unsplash.jpg')] bg-cover sm:rounded-tr-lg sm:rounded-br-lg">
              <p className="mt-96 mr-10 font-serif">Register!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
