import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import { PrimaryButton } from "../buttons/primaryButton";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import Modal from "../modal/modalPrimary.jsx";
import UserSteps from "../login/userSteps.jsx";
import Tooltip from "../tooltip/tooltip.jsx";
import UseStore from "../store/useStore.jsx";
import ModalSecondary from "../modal/modalSecondary.jsx";
import axios from "axios";
import UserPng from "../../public/assets/usercopy.png";
import { ToastContainer } from "react-toastify";
import UserCreatedStoriesSteps from "../userStories/userCreatedStoriesSteps.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { editUsersSchemea } from "../schemea/schemea";

export default function Header() {

//Ref for input field focus  
  const inputRef = useRef(null);

//Router for Navigating    
  const router = useRouter();

//Custom useContext Store  
  const { HandleGetUser, setUserData, userData, handleIsAccountModal , handleNotified, handleIsAccountSettingModal ,handleIsAccountUserStoryModal ,apiUrls} =
    UseStore();


  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [uploadImagePreview, setUploadImagePreview] = useState();
  const [inputValue, setInputValue] = useState({
    name: "",
    username: "",
    emailAddress: "",
    password: "",
    image: null,
    _id:""
  });

//OnChnange event handler for ProfileEdit  
  const handleChangeValue = (e) => {
    const fileReader = new FileReader();
    const { name, value, files } = e.target;

    fileReader.onload = () => {
      // Log the data URL or perform other actions with it
      setUploadImagePreview(fileReader.result);
    };

    // Make sure a file is selected before reading
    if (files && files.length > 0) {
      fileReader.readAsDataURL(files[0]);
    }

    if (name == "image") {
      setInputValue((val) => ({ ...val, [name]: files[0] }));
    } else {
      setInputValue((val) => ({ ...val, [name]: value }));
    }
  };


//For getting user information
  const handleCall = async () => {
    try {
      const response = await HandleGetUser();
      setUserData(response);
    } catch (e) {
      console.error(e);
    }
  };


//Calling handleCall  
  useEffect(() => {
    handleCall();
  }, []);


//Updating [inputValue] for displaying value in Account Settings fields
  useEffect(() => {
    setInputValue({
      name: userData?.name,
      username: userData?.username,
      emailAddress: userData?.emailAddress,
      password: userData?.password,
      _id:userData?._id
    });
  }, [userData]);


//For toggling user Profile icon images
  const handleToggleTT = () => {
    setIsToggleOpen(!isToggleOpen);
  };


//For Routing  
  const handleClick = (route) => {
    router.push(route);
  };

 
//For Logout  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData([]);
    setIsToggleOpen(false);
  };

//Trigger click event for image upload in account settings section   
  const hanldeUploadFileClick = () => {
    inputRef.current.click();
  };

//Appending user data in form for image upload and updation in account settings section  
  const handleEditUser = async (values) => {

    const form = new FormData();
    form.append("name", values.name);
    form.append("username", values.username);
    form.append("emailAddress", values.emailAddress);
    form.append("password", values.password);
    form.append("image", inputValue.image);
    form.append("_id", values._id);
    try {
     const res =  await axios.post(`${apiUrls}editUsers`, form, {
        headers: {
          // 'Content-Type' : 'application/json'
          "Content-Type": "multipart/form-data",
        },  
        validateStatus: function (status) {
          return status >= 200 && status <= 500;
        },
    });


      if(res.status === 200) {
        handleNotified("Updated Successfully" , "success");
        handleIsAccountSettingModal()
      }else if(res.status === 401){
        handleNotified("User not found" , "error");
      }else if(res.status === 409){
        handleNotified("Email already in use" ,"warn")
      }

    } catch (e) {
      console.error(e);
    } 
  };

  return (
  <>
  <ToastContainer />
  <div className="container mx-auto ">
    <div className=" flex  justify-between bg-transparent p-4 fixed w-[100%] left-0 top-0 z-50 px-20 ">
      <div >
      <Image alt="logo" src={Logo} width={100} height={100} onClick={()=>handleClick("/")} className="cursor-pointer"/>
      </div>
      <div className=" flex items-center justify-between gap-2">
        <PrimaryButton
          title="Create Story"
          outerStyle="bg-yellow-500 hover:bg-sky-400 text-black"
          onClick={()=>handleClick("/managechoose")}
        />
        {userData?.emailAddress &&
        <PrimaryButton
          title="My story"
          outerStyle="bg-black hover:bg-sky-400 text-white ring-1 ring-black"
          onClick={handleIsAccountUserStoryModal}
        />}

        <PrimaryButton
          title="Leaderboard"
          outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black"
          onClick={()=>handleClick("/leaderboard")}
        />

        <PrimaryButton
          title="Explore Audiobooks"
          outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black"
        />

        {userData?.emailAddress ? (
          <div className="relative cursor-pointer">
            <div onClick={handleToggleTT}>
              {userData?.image !== null ? (
                <Image
                alt="userImage"
                  src={`${apiUrls}${userData.image}`}
                  height={20}
                  width={40}
                  className="rounded-[100%] w-[40px] h-[40px] ring-4 ring-sky-400"
                />
              ) : (
                <Image
                  src={UserPng}
                  height={20}
                  width={40}
                  className="rounded-[100%] w-[40px] h-[40px] ring-4 ring-sky-400"
                />
              )}
            </div>
            {isToggleOpen && <Tooltip  onClick={handleLogout}></Tooltip>}
          </div>
        ) : (
          <CiUser
            size={24}
            className="cursor-pointer"
            color={"black"}
            onClick={handleIsAccountModal}
          />
        )}

        <Modal>
          <UserSteps />
        </Modal>

        <ModalSecondary>
          <div 
          >
            <div className="text-md font-bold border border-gray-300  px-4 inline-block p-2 rounded-t-lg border-b-0 relative">
              Account Settings
              <div className="absolute w-[100%] left-0 -bottom-1  bg-white h-[4px] z-1"></div>
            </div>
            <Formik
            enableReinitialize
            initialValues={inputValue} validationSchema={editUsersSchemea}
          onSubmit={handleEditUser}
          key={userData?._id}>
            <Form className="flex flex-col items-end gap-3 py-6 px-6 border border-gray-300  rounded-r-lg rounded-b-lg">
              <div className="flex items-center gap-4">
                <label htmlFor="name" className="text-sm font-bold">
                  Name:
                </label>
                <div>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  className="w-[300px] px-2 py-1 placeholder:text-[10px]  text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-gray-300 focus:outline-none focus:ring-2  focus:ring-black"
                />
                 <ErrorMessage name="name">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-1 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
              </div>
             
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="username" className="text-sm font-bold">
                  Username:
                </label>
                <div>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-[300px] px-2 py-1  placeholder:text-[10px] text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-gray-300 focus:outline-none focus:ring-2  focus:ring-black"
                />
                 <ErrorMessage name="username">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-1 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            </div>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="emailAddress" className="text-sm font-bold">
                  Email Address:
                </label>
                <div>
                <Field
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  placeholder="Email Address"
                  className="w-[300px] px-2 py-1 placeholder:text-[10px] text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-gray-300 focus:outline-none focus:ring-2  focus:ring-black"
                />
                 <ErrorMessage name="emailAddress">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-1 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            </div>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="password" className="text-sm font-bold">
                  Password:
                </label>
                <div>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  className="w-[300px] px-2 py-1 placeholder:text-[10px] text-blueGray-600 bg-transparent rounded text-sm border-0 shadow outline-none ring-1 ring-gray-300 focus:outline-none focus:ring-2  focus:ring-black"
                />
                  <ErrorMessage name="password">
              {(msg) => (
                <div className="text-red-600 text-center text-sm py-1 bg-red-100 ring-1 rounded  ring-red-600">
                  {msg}
                </div>
              )}
            </ErrorMessage>
              </div>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="image" className="text-sm font-bold">
                  Profile Pic:
                </label>
                <div className="flex items-center gap-2 w-[300px]">
                  <img
                    src={`${uploadImagePreview ? uploadImagePreview : UserPng}`}
                    alt="imgPreview"
                    className="h-[40px] w-[40px] rounded-[100%] ring-4 ring-white ring-offset-4 ring-offset-gray-300"
                  />
                  <div
                    className=" py-2 px-2 w-[50%] flex items-center   bg-violet-50 text-[12px] text-gray-400 rounded-lg hover:bg-violet-100 cursor-pointer"
                    onClick={hanldeUploadFileClick}
                  >
                    <span>Upload Picture ..</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      ref={inputRef}
                      placeholder="upload image"
                      onChange={handleChangeValue}
                      className="hidden "
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div>
                <PrimaryButton
                  outerStyle="bg-transparent hover:bg-sky-400 text-black ring-1 ring-black px-4 rounded-[8px]"
                  title="Save"
                  type="submit"
                />
              </div>
            </Form>
            </Formik>
          </div>
        </ModalSecondary>
        
        <UserCreatedStoriesSteps/>
      </div>
    </div>
    </div>
    </>
  );
}
