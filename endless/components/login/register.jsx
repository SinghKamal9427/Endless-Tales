import React from "react";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "../schemea/schemea.jsx";
import { PrimaryButton } from "../buttons/primaryButton.jsx";
import axios from "axios";
import UseStore from "../store/useStore";

export default function Register({onNext , toggleShow }) {
  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const { registerUser, setRegisterUser, handleNotified , handleIsAccountModal ,apiUrls} = UseStore();

  const handleRegisterUsers = async (values) => {
    const User = {
      dob: registerUser.dob,
      emailAddress: values.emailAddress,
      password: values.password,
    };
    try {
      const res = await axios.post(
        `${apiUrls}RegisterUsers`,
        User,
        {
          validateStatus: function (status) {
            return status >= 200 && status <= 500;
          },
        }
      );

      if (res.status === 200) {
        handleNotified("Registered successfully", "success");
        handleIsAccountModal()
        onNext()
      } else if (res.status === 409) {
        handleNotified("User already registered", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterSubmit = (values) => {
    setRegisterUser((val) => ({
      ...val,
      emailAddress: values.emailAddress,
      password: values.password,
    }));
    return handleRegisterUsers(values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={Logo} width={100} height={100} />
        <div className="text-lg font-extrabold flex items-center justify-center">
          Register
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleRegisterSubmit}
        >
          <Form className="flex flex-col gap-4">
            <ErrorMessage name="emailAddress">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-2 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>

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
              placeholder="Email Address"
              className="w-[350px] px-5 py-2 placeholder-blueGray-300 text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-black focus:outline-none focus:ring-2  focus:ring-black"
            />
            <Field
              name="password"
              type="password"
              placeholder="Enter Password"
              className="w-[350px] px-5 py-2 placeholder-blueGray-300 text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-black"
            />

            <div className="flex justify-between items-center">
              <PrimaryButton
                type="submit"
                title="Register"
                outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black "
              />
            </div>
          </Form>
        </Formik>
      </div>
      <div className="text-sm py-4 from-stone-500">
        Already have an account?{" "}
        <span
          className="font-bold cursor-pointer hover:text-sky-400"
          onClick={() => toggleShow()}
        >
          Login
        </span>
      </div>
    </>
  );
}
