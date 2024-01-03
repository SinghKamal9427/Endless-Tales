import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignupSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const TodoSchema = Yup.object().shape({
  todoName: Yup.string().required("Required"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const OtpValidateSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Otp is required")
    .min(6, "Otp must be of six digits")
    .max(6, "Otp must be of six digits"),
});


export const resetPasswordUserSchemea = Yup.object().shape({
  password : Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required"),
})