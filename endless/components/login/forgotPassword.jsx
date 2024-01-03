import React from "react";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ForgotPasswordSchema } from "../schemea/schemea.jsx";
import { PrimaryButton } from "../buttons/primaryButton";
import axios from "axios";
import UseStore from "../store/useStore";

export default function ForgotPassword({onNext}) {
  const initialValues = {
    emailAddress: ""
  };

  const {handleNotified} = UseStore();

  const handleSendOtp = async (values , {resetForm}) => {
    const res = await  axios.post("http://localhost:4000/sendOtp", values ,  {
      validateStatus: function (status) {
        return status >= 200 && status <= 500;
      },
    });
    if(res.status === 200) {
      handleNotified("Otp Sent Successfully" , "success");
      resetForm({values: ""})
      onNext()
    }else if (res.status === 401){
      handleNotified("Invalid Email Address", "error")
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={Logo} width={100} height={100} alt="logo"/>
        <div className="text-lg font-extrabold flex items-center justify-center">
          Forgot Password
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSendOtp}
        >
          <Form className="flex flex-col gap-4">
            <ErrorMessage name="emailAddress">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-2 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <Field
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              className="w-[350px] px-5 py-2 placeholder-blueGray-300 text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-black focus:outline-none focus:ring-2  focus:ring-black"
            />
            <div className="flex justify-between items-center">
              <PrimaryButton
                type="submit"
                title="Send otp"
                outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black "
              />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
