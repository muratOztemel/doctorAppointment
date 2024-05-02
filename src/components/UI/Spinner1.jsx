import { toast } from "react-toastify";

const Spinner1 = () => {
  return toast("Giriş Başarılı. Yönetim Paneline Yönlendiriliyorsunuz!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: "success",
  });
};
export default Spinner1;
