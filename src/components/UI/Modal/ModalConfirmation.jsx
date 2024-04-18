import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { object } from "prop-types";
import { createPortal } from "react-dom";
import {
  decreaseTimer,
  resetTimer,
  setIsActive,
} from "../../../redux/slices/modalSlice.js";
import { setUserLogin } from "../../../redux/slices/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { useConfirmActivationCodeMutation } from "../../../redux/features/api/apiSlice.js";
import Spinner from "../Spinner.jsx";
import OTPInput from "../../Dasboards/Services/OtpInput.jsx";

const Modal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmActivationCode, { data, isError, isLoading }] =
    useConfirmActivationCodeMutation();
  const { timer, isActive } = useSelector((state) => state.modal);
  const [otpInputs, setOtpInputs] = useState("");

  if (!props.isShowConfirmation) {
    return null;
  }

  if (isError) return <div>Error: {isError.toString()}</div>;
  if (isLoading) return <Spinner />;

  const handleSendData = async () => {
    try {
      //const response = await confirmActivationCode({ otp: otpInputs });

      let result = await confirmActivationCode({
        email: props.email,
        activationCode: otpInputs,
      });
      console.log("otpInputs", otpInputs);
      console.log("props id", props.userId);
      console.log("email", props.email);
      console.log(result);

      // API yanıtının başarılı olup olmadığını kontrol etmek için `data.success` kullanın
      if (result.data.accessToken) {
        localStorage.setItem("token", result.data.accessToken);
        // Kullanıcı giriş bilgilerini Redux state'ine kaydet
        dispatch(
          setUserLogin({
            userId: props.userId,
            username: props.email,
            token: result.data.accessToken,
          })
        );
        navigate("/auth/registerContinue/" + props.userId + "/" + props.email);
      } else {
        console.log("result", result);
        console.log("OTP doğrulanamadı.");
        // Doğrulama başarısızsa kullanıcıya hata mesajı gösterin
      }
    } catch (error) {
      console.error("OTP doğrulama hatası:", error);
    }
  };

  const reSendOTP = async () => {
    try {
      let result = await confirmActivationCode({
        email: props.email,
        activationCode: otpInputs,
        sendAgain: true,
      });
      console.log("otpInputs", otpInputs);
      console.log("props id", props.userId);
      console.log("email", props.email);
      console.log(result);

      // API yanıtının başarılı olup olmadığını kontrol etmek için `data.success` kullanın
      if (result.data.accessToken) {
        localStorage.setItem("token", result.data.accessToken);
        // Kullanıcı giriş bilgilerini Redux state'ine kaydet
        dispatch(
          setUserLogin({
            userId: props.userId,
            username: props.email,
            token: result.data.accessToken,
          })
        );

        //navigate("/auth/registerContinue/" + props.userId + "/" + props.email);
      } else {
        console.log("result", result);
        console.log("OTP doğrulanamadı.");
        // Doğrulama başarısızsa kullanıcıya hata mesajı gösterin
      }
    } catch (error) {
      console.error("OTP doğrulama hatası:", error);
    }
  };

  const restartTimer = () => {
    dispatch(resetTimer());
  };

  return createPortal(
    <div className="error-modal">
      <div className="flex justify-center items-center h-screen absolute">
        <div className="fixed inset-0 px-2 z-50 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-500 transition-opacity bg-opacity-75"
            onClick={() => props.setIsShowConfirmation(false)}></div>
          <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
            <div className="bg-red-500 text-white px-4 py-2">
              <h2 className="text-3xl font-semibold text-center">
                Confirmation Email!
              </h2>
            </div>
            <div className="p-4 text-center">
              <div className="mb-4">{props.message}</div>

              <OTPInput
                timer={timer}
                onInputChange={(otp) => setOtpInputs(otp)}
                isActive={isActive}
              />
              {!isActive && timer === 0 && (
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Burada tekrar gönderme işlemi için gereken fonksiyonu çağırabilirsiniz.
                      // Örneğin süreyi yeniden başlatmak ve/veya kullanıcıya yeni bir OTP göndermek.
                      restartTimer(); // Süreyi yeniden başlat
                      props.setIsShowConfirmation(true);
                      reSendOTP(); // Yeni bir OTP göndermek için bu fonksiyonu tanımlamalısınız.
                    }}
                    className="text-blue-600 hover:text-blue-800">
                    Resend activation code
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              {isActive ? (
                `Kalan Süre: ${Math.floor(timer / 60)}:${(
                  "0" +
                  (timer % 60)
                ).slice(-2)}`
              ) : (
                <button
                  onClick={() => {
                    restartTimer();
                    reSendOTP();
                    props.setIsShowConfirmation(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Süreyi Yeniden Başlat
                </button>
              )}
            </div>
            <div className="border-t px-4 py-2 flex justify-center">
              <button
                // to={`/registerContinue/${userId}`}
                onClick={handleSendData}
                disabled={isLoading}
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Yes, I&apos;m sure
              </button>
              <a
                href="#"
                onClick={() => props.setIsShowConfirmation(false)}
                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                No, cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;

Modal.propTypes = {
  props: object,
};
