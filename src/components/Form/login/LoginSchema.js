import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Enter a valid email address")
    .required("Email address required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default LoginSchema;
