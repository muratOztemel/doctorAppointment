import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
export const registerData = [
  {
    id: "name",
    type: "text",
    label: "Name",
    placeholder: "Name",
    icon: FaUser,
  },
  {
    id: "surname",
    type: "text",
    label: "Surname",
    placeholder: "Surname",
    icon: FaUser,
  },

  {
    id: "idNumber",
    type: "text",
    label: "Identy Number",
    placeholder: "Identy Number",
    icon: FaUser,
  },
  {
    id: "birthDate",
    type: "date",
    label: "Birthdate",
    placeholder: "Birthdate",
  },
  {
    id: "phoneNumber",
    type: "tel",
    label: "Phone",
    placeholder: "Phone",
    icon: FaPhone,
  },
];
