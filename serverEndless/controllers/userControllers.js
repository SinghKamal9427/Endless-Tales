import { RegisterModel, UserSteps } from "../db/models/userModel.js";
import Jwt from "jsonwebtoken";
import { Transporter } from "../middlewares/nodemailerC.js";/* 
import { UploadImageAWS, GetUploadedImageAWS } from "../awsS3/aswS3.js"; */

let otp_ = {};

export const FetchData = (req, res) => {
  res.send("Welcome");
};

export const RegisterUsers = async (req, res) => {
  const { dob, emailAddress, password } = req.body;

  const data = {
    dob: dob,
    emailAddress: emailAddress,
    password: password,
  };

  try {
    const check = await RegisterModel.findOne({
      emailAddress: emailAddress,
    });

    if (check) {
      return res.status(409).json({ message: "User already registered" });
    } else {
      RegisterModel.insertMany(data);
      return res.status(200).json({ message: "registered" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginUsers = async (req, res) => {
  const { emailAddress, password } = req.body.values;
  try {
    const check = await RegisterModel.findOne({
      emailAddress: emailAddress,
      password: password,
    });

    if (check) {
      const token = Jwt.sign({ userId: check._id }, "your_secret_key");
      res
        .status(200)
        .json({ message: "User Logged in successfully", token: token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  const reqData = req.user.userId;

  try {
    const user = await RegisterModel.findById(reqData);

    if (user) {
      /*   const key = user.image;
      const imageUrl = await GetUploadedImageAWS(key);

      console.log(imageUrl, "url"); */

      const dummyImage = "uploads/images/user.png";

      const resData = {
        dob: user.dob,
        emailAddress: user.emailAddress,
        image: user.image !== "" ? user.image : dummyImage,
        password: user.password,
        name: user.name,
        username: user.username,
        _id: user._id,
      };
      res.send(resData);
    }
  } catch (err) {
    console.error(err);
  }
};

export const editUsers = async (req, res) => {
  const { name, username, emailAddress, password, _id } = req.body;

  let fileLocation = "";

  if (req.file) {
    fileLocation = `${req.file.destination}/${req.file.filename}`;
  }
  /*  const file = req.file;
   let imageUrl = "";

 if (file) {
    imageUrl = await UploadImageAWS(file);
  } */

  const userData = {
    name: name,
    username: username,
    emailAddress: emailAddress,
    password: password,
    image: req.file && fileLocation,
  };

  /*  const checkSameInputUser = (obj1 , obj2) => {
    let objKeys1 = Object.keys(obj1);
    for (let key of objKeys1 ){
      if (obj1[key] != obj2[key]) { return false; } } 
         return true;
  } */

  try {
    const user = await RegisterModel.findById(_id);
    const userEmailDuplicate = await RegisterModel.find({
      emailAddress: emailAddress,
    });

    /*  if(checkSameInputUser( user , userData )) { console.log("same input user") }
    else{ console.log("diiff input user") } */

    if (
      user._id.toString() != userEmailDuplicate[0]?._id.toString() &&
      userEmailDuplicate.length > 0
    ) {
      res.status(409).json({ message: "Email Already Exists " });
    } else {
      if (user) {
        await RegisterModel.updateOne({ _id: _id }, userData);
        res.status(200).json({ message: "Updated Successfully" });
      } else {
        res.status(401).json({ message: "User not found" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtp = async (req, res) => {
  const email = req.body.emailAddress;
  const check = await RegisterModel.findOne({ emailAddress: email });

  if (!check) {
    return res.status(401).json({ message: "Invalid email address" });
  } else {
    if (Object.keys(otp_).length > 0) {
      otp_ = {};
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otp_[email] = otp;

    const mailOptions = {
      from: "kamaldeep228@vibhuti.biz",
      to: email,
      subject: "Forgot Password OTP",
      text: `Your OTP for password reset is : ${otp}`,
    };

    Transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error, "Error sending otp");
        return res.status(500).json({ message: "Error sending otp" });
      }

      return res.status(200).json({ message: "Otp sent successfully" });
    });
  }
};

export const validataOtp = (req, res) => {
  const otp = req.body.otp;

  if (otp) {
    if (otp == Object.values(otp_).toString()) {
      res
        .status(200)
        .json({ message: "Otp Mached", body: Object.keys(otp_).toString() });
    } else {
      res.status(401).json({ message: "Otp Not Mached" });
    }
  }
};

export const getresetUser = async (req, res) => {
  const userEmail = req.body;
  const email = Object.keys(userEmail).toString();

  const user = await RegisterModel.findOne({
    emailAddress: email,
  });
  if (user) {
    res.json(user);
  } else {
    res.json({ message: "Invalid email address" });
  }
};

export const resetUserPassword = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const check = await RegisterModel.findOne({ emailAddress: emailAddress });

    if (check) {
      await RegisterModel.updateOne(
        { emailAddress: emailAddress },
        { password: password }
      );
      res.status(200).json({ message: "passwords updated successfully" });
    } else {
      res.status(404).json({ message: "password update failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUserSteps = async (req, res) => {
  const userStepsdata = req.body;
  const userId = req.user.userId;

  const newUserStepsData = new UserSteps({
    userSteps: userStepsdata.map((val) => ({
      title: val.title,
      id: val.id,
    })),
    userId: userId,
  });

  try {
    await newUserStepsData.save();
    res.status(200).json({ message: "User step saved successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserSteps = async (req, res) => {
  const userId = req.user.userId;
  try {
    const check = await UserSteps.find({
      userId: userId,
    });
    res.status(200).json({ message: "sucess", body: check });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editUserSteps = async (req, res) => {
  const updateddata = req.body;

  try {
    const check = await UserSteps.findById(updateddata._id);

    if (check) {
      await UserSteps.updateOne({ _id: updateddata._id }, updateddata);
      res.status(200).json({ message: "updated successfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserSteps = async (req, res) => {
  const userId = req.body.id;

  try {
    const check = await UserSteps.findById(userId);

    if (check) {
      await UserSteps.deleteOne({ _id: userId });
      res.status(200).json({ message: "Story deleted Successfully" });
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserAudio = async (req, res) => {
  try {
    const data = [
      {
        audioPath: "uploads/music/demo1.mp3",
        name: "Story First",
      },
      {
        audioPath: "uploads/music/demo2.mp3",
        name: "Story Second",
      },
    ];

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
