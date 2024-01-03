import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import { useState } from "react";
import "./register.css";
import "react-simple-keyboard/build/css/index.css";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import UseStore from "../store/useStore";

export default function RegisterDob({ onNext }) {
 

  const [otp, setOtp] = useState(["", "", "", ""]);

  const {  setRegisterUser } = UseStore()

  /* const formatNumber = (value) => {
    return value.replace(/[^\d]/g, "")
}

 */

  const handleInput = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeypadClick = (number) => {
    if (number === "Backspace") {
      const nonEmptyIndex = otp.findLastIndex((value) => value !== "");

      if (nonEmptyIndex !== -1) {
        handleInput(nonEmptyIndex, "");
      } else if (nonEmptyIndex === -1 && otp.length > 0) {
        // Clear the last input if all inputs are empty
        handleInput(otp.length - 1, "");
      }
    } else {
      const emptyIndex = otp.findIndex((value) => value === "");

      if (emptyIndex !== -1) {
        handleInput(emptyIndex, number);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    const filled = otp.filter((val) => val === "");

    if (e.key === "Backspace" && index > 0) {
      if (otp[index] === "") {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
    if (e.key === "Enter" && index > 0 && filled.length == 0) {
      const dob_ = otp.join("").replace(/,/g, " ");
      setRegisterUser((val) => ({...val , dob : dob_ }))
      onNext();
    }
  };


  return (
    <div className="flex flex-col items-center justify-center px-10">
      <Image src={Logo} width={100} height={100} />
      <div className="text-lg font-extrabold ">Verify Age to Continue</div>
      <div className="text-sm">Please enter your birth year</div>
      <div className="flex flex-col items-center mt-8">
        <div className="flex space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="tel"
              pattern="[0-9]"
              maxLength={1}
              value={value}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyUp={(e) => handleKeyDown(index, e)}
              className="w-12 h-10 border text-center rounded-xl ring-1 ring-black"
            />
          ))}
        </div>

        <div className="grid gap-2 mt-4 justify-end content-end grid-col-3 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "Backspace"].map((number) => (
            <button
              key={number}
              onClick={() => handleKeypadClick(number)}
              className="w-16 h-10 rounded-xl bg-yellow-500 font-bold border text-center flex items-center justify-center"
            >
              {number == "Backspace" ? <MdOutlineKeyboardBackspace /> : number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
