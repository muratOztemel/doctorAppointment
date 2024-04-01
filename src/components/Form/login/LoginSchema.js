import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi gereklidir"),

  password: Yup.string()
    .min(7, "Şifre en az 7 karakter olmalıdır")
    .required("Şifre gereklidir"),
});

export default LoginSchema;
