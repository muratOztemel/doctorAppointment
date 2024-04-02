import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

export const loginData = [
  {
    id: "username",
    type: "email",
    label: "E-posta",
    placeholder: "E-posta Adresiniz",
    icon: MdEmail,
  },
  {
    id: "password",
    type: "password",
    label: "Şifre",
    placeholder: "Şifrenizi giriniz",
    icon: FaKey,
  },
];
