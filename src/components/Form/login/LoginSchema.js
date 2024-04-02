import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi gereklidir"),

  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gereklidir"),
});

export default LoginSchema;
