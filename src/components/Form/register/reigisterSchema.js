import * as yup from "yup";
import { eighteenYearsAgo } from "./date";
const passwordRegex = new RegExp();

export const schema = yup.object().shape({
  name: yup.string().min(3).required("İsim ve Soyisim  zorunlu bir alamdır"),
  surname: yup.string().required("Soy isim zorunlu bir alandır"),
  idNumber: yup
    .string()
    .required("Kimlik numarası zorunludur")
    .matches(/^[0-9]+$/, "Kimlik numarası sadece rakamlardan oluşmalıdır")
    .length(11, "Kimlik numarası 11 haneli olmalıdır"),
  birthDate: yup
    .date()
    .max(eighteenYearsAgo, "18 yaşından küçükler randevü alamaz!!!")
    .required("Doğum tarihi gerekli."),
  email: yup
    .string()
    .email("Lütfen geçerli bir email giriniz!")
    .required("Email zorunlu bir alandır"),
  password: yup
    .string()
    .min(
      5,
      "Şifreniz en az 5 karakterden olmalı ve en az bir byük harf ve küçük harf içermelidir"
    )
    .matches(passwordRegex, "Lütfen daha güçlü şifre yazınız")
    .required("Şifre alanı zorunludur"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifre eşleşmiyor"),
  phoneNumber: yup
    .string()
    .required("Telefon numarası zorunludur")
    .matches(/^\d{10}$/, "Geçerli bir telefon numarası giriniz"),
  terms: yup
    .boolean()
    .oneOf([true], "Kullanıcı sözleşmesini kabul etmelisiniz"),
});
