import Image from "next/image";
import StepSv from "../../public/assets/step7.png";
import { useRef, useState } from "react";
import UseStore from "../store/useStore";
import axios from "axios";

export default function StepSeventh({ onNext }) {
  const { data, setData , apiUrls  , handleNotified} = UseStore();
  const [inputValue, setInputValue] = useState();
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);

  /* const story = data.map((val)=>{
    switch(val.id) {
      case 1:
        return <span key= {val.id}>The story Type is about {val.title}. </span>;
        case 2:
        return <span key= {val.id}>In which the Scenario is {val.title}. </span>;
        case 3:
        return <span key= {val.id}>and the Artifacts is {val.title}. </span>
        case 4:
        return <span key= {val.id}>Moral of the Story is {val.title}. </span>
        case 5:
        return <span key= {val.id}>The gradle level of the story is {val.title}. </span>
        case 6:
        return <span key= {val.id}>The story will be in {val.title} Language. </span>
        case 7:
        return <span key= {val.id}>The name of the main character will be {val.title}. </span>
        default:
          return null;
    }
  }) */

  const handleSendUserStepData = async (userData) => {
    if(userData.length > 0 && userData[0].id === 1) {
    try {
     await axios.post(`${apiUrls}userSteps`,userData,{
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
     });
     handleNotified("Story created successfully" , "success")
    } catch (e) {
      console.error(e);
      handleNotified("Login before creating story" , "error")
    } }else{
      handleNotified("Please recreate story" , "warning")
    }
  };

  const handleSendData = async () => {
    let newData = [];
    if (!inputValue) {
      setShowError(true);
      inputRef.current.focus();
    } else {
      setData((prevData) => {
        const filter = prevData.filter((value) => value.id !== 7);
        newData = [...filter, { title: inputValue, id: 7 }];
        return newData;
      });
      setShowError(false);
      return handleSendUserStepData(newData);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={StepSv} alt="Hero Banner" className="w-[10em] h-[7em] " />
      <div className="font-black text-2xl pb-8">Enter Keywords</div>

      <div className=" bg-[#ffffff34]  rounded-xl w-[600px]   flex flex-col items-center gap-4 justify-center py-8 px-8">
        <div className=" w-[100%] flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            className={`${
              showError ? "  ring-4 ring-red-500 " : "ring-1 ring-white"
            } bg-[#ffbd2488]  w-[100%] rounded-xl py-10 px-10 focus:outline-none `}
            placeholder="Name the main characters and make story more exiciting"
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
        </div>
        <div className="w-[100%] flex items-center justify-center">
          <button
            className="bg-[#02b7ff] w-[100%]  py-5 rounded-xl"
            onClick={() => handleSendData()}
          >
            <div className="font-bold text-white text-xl">Generate Story</div>
          </button>
        </div>
      </div>
      {/*   <div className="text-center flex flex-col">
        {story}
      </div> */}
    </div>
  );
}
