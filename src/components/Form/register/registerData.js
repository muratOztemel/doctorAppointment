import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export const registerData = [
  {
    id: "name",
    type: "text",
    label: "Ad",
    placeholder: "Adınız",
    icon: FaUser,
  },
  {
    id: "surname",
    type: "text",
    label: "Soyad",
    placeholder: "Soyadınız",
    icon: FaUser,
  },

  {
    id: "idNumber",
    type: "text",
    label: "Kimlik Numarası",
    placeholder: "Kimlik Numaranız",
    icon: FaUser,
  },
  {
    id: "email",
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
  {
    id: "confirmPassword",
    type: "password",
    label: "Şifre Onayı",
    placeholder: "Şifrenizi Onaylayın",
    icon: FaEye,
  },
  {
    id: "birthDate",
    type: "date",
    label: "Doğum Tarihi",
    placeholder: "Doğum Tarihiniz",
  },

  {
    id: "phoneNumber",
    type: "tel",
    label: "Telefon Numarası",
    placeholder: "Telefon Numaranız",
    icon: FaPhone,
  },
];
