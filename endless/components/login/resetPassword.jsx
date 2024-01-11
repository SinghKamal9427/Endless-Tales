import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {  resetPasswordUserSchemea } from "../schemea/schemea.jsx";
import { PrimaryButton } from "../buttons/primaryButton";
import axios from "axios";
import UseStore from "../store/useStore";
import { useEffect, useState } from "react";

export default function ResetPassword({ onNext }) {
  const [userValue, setUserValue] = useState({
    emailAddress: "",
    password: "",
  })

  const { resetPasswordUser , handleNotified , handleIsAccountModal,apiUrls } = UseStore();

  const handleResetPasswordSubmit = async (values , {resetForm}) => {

   const res =  await axios.post(`${apiUrls}resetUserPassword` , {
        emailAddress : resetPasswordUser,
        password: values.password
    })

    if(res.status === 200) {
      handleNotified("Password reset successfully" , "success")
      resetForm({ values : ""})
      handleIsAccountModal()
      onNext()
    }else if(res.status === 404){
      handleNotified("Password reset failed" , "error")
    }

  };

  const handlegetResetPasswordUser = async () => {
   const res =  await axios.post(
    `${apiUrls}getresetUser`,
      resetPasswordUser
    );
    setUserValue((val) => ({...val , emailAddress: res.data.emailAddress}))
  };

  useEffect(() => {
    handlegetResetPasswordUser()
  }, []);


  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={Logo} width={100} height={100} />
        <div className="text-lg font-extrabold flex items-center justify-center">
          Reset Password
        </div>
        <Formik
          initialValues={userValue}
          validationSchema={resetPasswordUserSchemea}
          onSubmit={handleResetPasswordSubmit}
        >
          <Form className="flex flex-col gap-4">
            <ErrorMessage name="password">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-2 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <Field
              name="emailAddress"
              type="text"
              value = {userValue.emailAddress}
              disabled
              placeholder="Email Address"
              className="w-[350px] px-5 py-2 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring-2  focus:ring-black"
            />
            <Field
              name="password"
              type="password"
              placeholder="Enter New Password"
              className="w-[350px] px-5 py-2 placeholder-blueGray-300 text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-black"
            />

            <PrimaryButton
              type="submit"
              title="Reset Password"
              outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black "
            />
          </Form>
        </Formik>
      </div>
    </>
  );
}
