import * as yup from "yup";
import { eighteenYearsAgo } from "./date";
const passwordRegex = new RegExp();

export const schema = yup.object().shape({
  name: yup.string().min(3).required("İsim ve Soyisim  zorunlu bir alandır"),
  surname: yup.string().required("Soy isim zorunlu bir alandır"),
  idNumber: yup
    .string()
    .required("Kimlik numarası zorunludur")
    .matches(/^[0-9]+$/, "Kimlik numarası sadece rakamlardan oluşmalıdır"),
  birthDate: yup.date().required("Doğum tarihi gerekli."),
  phoneNumber: yup
    .string()
    .required("Telefon numarası zorunludur")
    .matches(/^[0-9]+$/, "Geçerli bir telefon numarası giriniz"),
});
