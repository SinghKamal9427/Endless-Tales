import { useState } from "react";
import Login from "./login.jsx";
import ForgotPassword from "./forgotPassword.jsx";
import RegisterDob from "./registerDob.jsx";
import Register from "./register.jsx";
import OtpValidate from "./otpValidate.jsx";
import ResetPassword from "./resetPassword.jsx";

export default function UserSteps() {
  const [currentStepLogin, setCurrentStepLogin] = useState(0);
  const [currentStepRegister, setCurrentStepRegister] = useState(0);
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  const onPrevLogin = () => {
    if (currentStepLogin !== 0) {
      setCurrentStepLogin(currentStepLogin - 1);
    }
  };
  const onNextLogin = () => {

    if (currentStepLogin !== loginList.length - 1) {
      return setCurrentStepLogin(currentStepLogin + 1);
    }

    if (currentStepLogin === loginList.length - 1) {
      return setCurrentStepLogin(0);
    }
  };

  const onPrevRegister = () => {
    if (currentStepRegister !== 0) {
      setCurrentStepRegister(currentStepRegister - 1);
    }
  };
  const onNextRegister = () => {
    if (currentStepRegister !== registerList.length - 1) {
      return setCurrentStepRegister(currentStepRegister + 1);
    }

    if (currentStepRegister === registerList.length - 1) {
      toggleShow();
      return setCurrentStepRegister(0);
    }
  };

  const loginList = [
    <Login onNext={onNextLogin} toggleShow={toggleShow} />,
    <ForgotPassword onNext={onNextLogin} />,
    <OtpValidate onNext={onNextLogin} />,
    <ResetPassword onNext={onNextLogin} />,
  ];
  const registerList = [
    <RegisterDob onNext={onNextRegister} />,
    <Register onNext={onNextRegister} toggleShow={toggleShow} />,
  ];

  return (
    <>
      {show ? loginList[currentStepLogin] : registerList[currentStepRegister]}
    </>
  );
}
