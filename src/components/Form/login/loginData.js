import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

export const loginData = [
  {
    id: "username",
    type: "email",
    label: "E-Mail",
    placeholder: "E-Mail Address",
    icon: MdEmail,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    icon: FaKey,
  },
];
