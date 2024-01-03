import Image from "next/image";
import StepFH from "../../public/assets/step4.png";
import SciFi from "../../public/assets/Sci-Fi-icon.png";
import storyMoralsData from "../utilis/storyMoralsData"
import { useContext } from "react";
import { Context } from "../store/createContextStore";


export default function StepForth ({ onNext}) {
  const { data, setData } = useContext(Context);

  const handleSelect = (val) => {
    const filter = data.filter((value) => value.id !== val.id);
    setData(() => [...filter, { title: val.title, id: val.id }]);
    onNext();
  };


    return (
        <div className="flex flex-col items-center justify-center">
        <Image src={StepFH} alt="Hero Banner" className="w-[10em] h-[7em] " />
        <div className="font-black text-2xl pb-8">{storyMoralsData[0].chooseType}</div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:mx-[26%]">
        {storyMoralsData.map((val,inx)=>{
            return <div key={inx} className="w-[100%] py-4 bg-[#ffffff34] group  hover:bg-[#02b7ff] transition-all duration-100 rounded-[30px]  " onClick={()=>handleSelect(val)}>
            
            <div className="h-[40%] flex flex-col items-center justify-center text-center px-2">
             <div className=" group-hover:text-white text-black text-lg font-bold "> {val.title} </div>
            </div>
          </div>})}
        </div>
        </div>
    )
}