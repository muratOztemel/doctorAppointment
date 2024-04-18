import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
export const registerData = [
  {
    id: "email",
    type: "email",
    label: "E-mail",
    placeholder: "E-mail Address",
    icon: MdEmail,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
    icon: FaKey,
  },
  {
    id: "confirmPassword",
    type: "password",
    label: "Password Confirmation",
    placeholder: "Reenter password",
    icon: FaEye,
  },
];
