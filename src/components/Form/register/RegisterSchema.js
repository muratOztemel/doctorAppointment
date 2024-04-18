import * as yup from "yup";
const passwordRegex = new RegExp();

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(
      6,
      "Your password must be at least 6 characters and contain at least one uppercase letter and one lowercase letter."
    )
    .matches(passwordRegex, "Please type a stronger password")
    .required("Password field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifre eşleşmiyor"),
  terms: yup.boolean().oneOf([true], "You must accept the user agreement"),
});
