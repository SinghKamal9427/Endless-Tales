import Image from "next/image";
import StepFH from "../../public/assets/step5.png";
import SciFi from "../../public/assets/Sci-Fi-icon.png";
import GradeLevelData from "../utilis/GradeLevelData"
import { useContext } from "react";
import { Context } from "../store/createContextStore";

export default function StepFifth ({ onNext}) {

  const { data, setData } = useContext(Context);

  const handleSelect = (val) => {
    const filter = data.filter((value) => value.id !== val.id);
    setData(() => [...filter, { title: val.title, id: val.id }]);
    onNext();
  };



    return (
        <div className="flex flex-col items-center justify-center">
        <Image src={StepFH} alt="Hero Banner" className="w-[10em] h-[7em] " />
        <div className="font-black text-2xl pb-8">{GradeLevelData[0].chooseType}</div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:mx-[26%]">
        {GradeLevelData.map((val,inx)=>{
            return <div key={inx} className="h-[145px] w-[145px] bg-[#ffffff34] group  hover:bg-[#02b7ff] transition-all duration-100 rounded-[30px]  " onClick={()=>handleSelect(val)}>
                <div className="h-[60%] flex flex-col items-center justify-center">
            <div className="group-hover:bg-[#02b7ff]  bg-[#ffbf24] h-[80%] w-[60%] rounded-2xl group-hover:text-white text-black  ring-1 ring-white flex  items-center justify-center overflow-hidden">
              <Image src={val.icon} alt="Hero Banner"/>
            </div>
            </div>
            <div className="h-[40%] flex flex-col items-center justify-center text-center px-2">
             <div className=" group-hover:text-white text-black text-sm font-bold "> {val.title} </div>
            </div>
          </div>})}
        </div>
        </div>
    )
}