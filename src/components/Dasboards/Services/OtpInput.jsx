import { useRef, useState, useEffect, useCallback } from "react";

const OTPInput = ({ onInputChange, isActive, timer }) => {
  const inputRef = useRef([]);
  const maxLength = 6;

  const [inputs, setInputs] = useState(Array(maxLength).fill(""));

  const handleChange = (index, event) => {
    if (!isActive) return;

    const newInputs = [...inputs];
    const value = event.target.value;

    if (value === "" || /^[0-9]$/.test(value)) {
      newInputs[index] = value;
      setInputs(newInputs);
      onInputChange(newInputs.join(""));

      // Otomatik olarak bir sonraki input'a odaklan
      if (value && index < maxLength - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !inputs[index] && index > 0) {
      inputRef.current[index - 1].focus();
    } else if (event.key === "Backspace" && !inputs[index] && index === 0) {
      // Sıfırıncı giriş alanında Backspace tuşuna basıldığında tekrar gönderme işlemi yap
      onResend();
    }
  };

  const handleFocus = (event) => event.target.select();

  // Süreyi sıfırla ve tekrar gönderme işlemi yap
  const onResend = useCallback(() => {
    onInputChange("");
    setInputs(Array(maxLength).fill(""));
  }, [onInputChange, setInputs, maxLength]);

  useEffect(() => {
    if (timer === 0 && isActive) {
      // Süre dolduğunda yapılacak işlemler
      console.log("Süre doldu, kodu yeniden gönderme seçeneği sun.");
    }
  }, [timer, isActive]);

  return (
    <div className="flex justify-center space-x-2">
      {inputs.map((input, index) => (
        <input
          key={index}
          ref={(el) => (inputRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={input}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onFocus={handleFocus}
          disabled={!isActive} // isActive false ise inputları devre dışı bırak
          className={`w-10 h-10 text-center border-2 ${
            isActive ? "border-gray-300" : "border-red-500"
          } rounded`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
