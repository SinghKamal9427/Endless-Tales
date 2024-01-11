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
    <Login onNext={onNextLogin} toggleShow={toggleShow} key={1} />,
    <ForgotPassword onNext={onNextLogin} key={2}/>,
    <OtpValidate onNext={onNextLogin} key={3}/>,
    <ResetPassword onNext={onNextLogin} key={4}/>,
  ];
  const registerList = [
    <RegisterDob onNext={onNextRegister} key={1}/>,
    <Register onNext={onNextRegister} toggleShow={toggleShow} key={2}/>,
  ];

  return (
    <>
      {show ? loginList[currentStepLogin] : registerList[currentStepRegister]}
    </>
  );
}
