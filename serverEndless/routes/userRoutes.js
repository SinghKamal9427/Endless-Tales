import Express from "express";

import {
  FetchData,
  RegisterUsers,
  LoginUsers,
  getUsers,
  editUsers,
  sendOtp,
  validataOtp,
  getresetUser,
  resetUserPassword,
  createUserSteps,
  getUserSteps,
  editUserSteps,
  deleteUserSteps,
} from "../controllers/userControllers.js";
import { Auth } from "../middlewares/auth.js";
import { Upload } from "../middlewares/imageUpload.js";

const router = Express.Router();

router.get("/", FetchData);

router.post("/RegisterUsers", RegisterUsers);

router.post("/LoginUsers", LoginUsers);

router.get("/getUsers", Auth, getUsers);

router.post("/editUsers", Upload.single("image"), editUsers);

router.post("/sendOtp", sendOtp);

router.post("/validataOtp", validataOtp);

router.post("/getresetUser" , getresetUser)

router.post("/resetUserPassword" , resetUserPassword)

router.post("/userSteps" , Auth , createUserSteps)

router.get("/getUserSteps" , Auth , getUserSteps)

router.post("/editUserSteps" , editUserSteps)

router.post("/deleteUserSteps" ,deleteUserSteps)

export default router;
