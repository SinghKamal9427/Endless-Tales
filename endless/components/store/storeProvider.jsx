import { useState } from "react";
import { Context } from "./createContextStore.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function StoreProvider({ children }) {
  const [data, setData] = useState([
    {
      title: "",
      id: "",
    },
  ]);

  const [resetPasswordUser, setResetPasswordUser] = useState();

  const [registerUser, setRegisterUser] = useState({
    dob: "",
    emailAddress: "",
    password: "",
  });

  const [userData, setUserData] = useState([]);

  const HandleGetUser = async () => {
    if(localStorage.getItem("token")){
    try {
      const user = await axios.get("http://localhost:4000/getUsers", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      return user.data;
    } catch (e) {
      console.error(e);
    }
  }
  };

  const [isAccountSettingModal, setIsAccountSettingModal] = useState(false);

  const handleIsAccountSettingModal = () => {
    setIsAccountSettingModal(!isAccountSettingModal);
  };

  const [isAccountModal, setIsAccountModal] = useState(false);

  const handleIsAccountModal = () => {
    setIsAccountModal(!isAccountModal);
  };

  const [isAccountUserStoryModal, setisAccountUserStoryModal] = useState(false);

  const handleIsAccountUserStoryModal = () => {
    setisAccountUserStoryModal(!isAccountUserStoryModal);
  };

  const handleNotified = (title, type) => {
    toast[type](title, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const contextValue = {
    data,
    setData,
    userData,
    setUserData,
    registerUser,
    setRegisterUser,
    resetPasswordUser,
    setResetPasswordUser,
    HandleGetUser,
    isAccountModal,
    handleIsAccountModal,
    handleIsAccountSettingModal,
    isAccountSettingModal,
    handleNotified,
    handleIsAccountUserStoryModal,
    isAccountUserStoryModal,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
