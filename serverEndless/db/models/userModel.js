import { model, Schema } from "mongoose";

/* const default_img_path = "../../uploads/images/user.png"; */

const registerSchemea = new Schema({
  dob: { type: "string", required: true },
  emailAddress: { type: "string", required: true },
  password: { type: "string", required: true },
  image: { type: "string", default: null },
  name:{type:"string" , default:"Enter your name"},
  username:{type:"string", default:function() {
    return this.emailAddress || "Enter your email address"
  }}
});

const RegisterModel = model("Register", registerSchemea);


const userStepsSchema = new Schema({
  userSteps: [
    {
      title: { type: "string" },
      id: { type: Number },
    },
  ],
  userId : {
    type : Schema.Types.ObjectId,
    ref : "Register"
  },
  date:{ type:Date , default : Date.now },
});


const UserSteps = model("UserSteps", userStepsSchema);


export { RegisterModel, UserSteps  };
