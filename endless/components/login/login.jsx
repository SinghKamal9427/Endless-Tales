import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "../schemea/schemea.jsx";
import { PrimaryButton } from "../buttons/primaryButton";
import axios from "axios";
import UseStore from "../store/useStore";

export default function Login({ onNext, toggleShow }) {
  const initialValues = {
    emailAddress: "",
    password: "",
  };
  const { HandleGetUser, setUserData, handleNotified , handleIsAccountModal} = UseStore();

  const handleLoginSubmit = async (values , {resetForm}) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/LoginUsers",
        {
          values,
        },
        {
          validateStatus: function (status) {
            return status >= 200 && status <= 500;
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const response = await HandleGetUser();
        setUserData(response);
        handleNotified("User Successfully Logged In", "success");
        resetForm({values:""})
        handleIsAccountModal()
      } else if (res.status === 401) {
        handleNotified("Incorrect Username and Password", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={Logo} width={100} height={100} alt="logo"/>
        <div
          className="text-lg font-extrabold flex items-center justify-center "
          onClick={() => handleNotified("text", "success")}
        >
          Log In
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLoginSubmit}
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
                title="Login"
                outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black "
              />
              <div
                className="hover:text-sky-400 font-bold text-sm cursor-pointer"
                onClick={onNext}
              >
                Forgot password?
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="text-sm py-4 from-stone-500">
        Don't have account?{" "}
        <span
          className="font-bold cursor-pointer hover:text-sky-400"
          onClick={() => toggleShow()}
        >
          Register
        </span>
      </div>
    </>
  );
}
