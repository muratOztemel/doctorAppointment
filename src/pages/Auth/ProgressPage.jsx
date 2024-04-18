import { HiOutlineIdentification } from "react-icons/hi";
import { HiMiniIdentification } from "react-icons/hi2";

const ProgressPage = ({ status }) => {
  return (
    <ol className="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-3">
      <li
        className={`flex items-center justify-center gap-2 p-4 ${
          status === "registerEmail" ? "bg-gray-100" : ""
        }`}>
        <HiOutlineIdentification className="size-7 shrink-0" />

        <p className="leading-none">
          <strong className="block font-medium"> Create account </strong>
          <small className="mt-1">
            {" "}
            Enter email and password to confirmation.{" "}
          </small>
        </p>
      </li>

      <li
        className={`relative flex items-center justify-center gap-2 p-4 ${
          status === "registerForm" ? "bg-gray-100" : ""
        }`}>
        <span
          className={`${
            status === "registerEmail" ? "bg-gray-100" : ""
          } absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50`}></span>

        <span
          className={`${
            status === "registerForm" ? "bg-gray-100" : ""
          } absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white`}></span>

        <HiMiniIdentification className="size-7 shrink-0" />

        <p className="leading-none">
          <strong className="block font-medium"> Continue Registration </strong>
          <small className="mt-1"> Enter your information. </small>
        </p>
      </li>

      <li className="flex items-center justify-center gap-2 p-4">
        <svg
          className="size-7 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>

        <p className="leading-none">
          <strong className="block font-medium"> Finish Progress </strong>
          <small className="mt-1"> Enter to Dashboard </small>
        </p>
      </li>
    </ol>
  );
};
export default ProgressPage;
