import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { BiSolidRightArrow } from "react-icons/bi";
import voices from "../constants/voices.json";

export default function SelectBoxPlayer() {
  const [voiceToggle, setVoiceToggle] = useState(false);
  const [currentSelectBoxName , setCurrentSelectBoxName] = useState("Adam")

  const handleVoiceToggle = () => {
    setVoiceToggle(!voiceToggle);
  };

  const handleVoiceTransition = (e) => {
    const voiceTarget = e.target.closest('[data-voicess]')
    if(voiceTarget){
    const voiceTargetParse = voiceTarget.dataset.voicess
    const voiceTargetObject = JSON.parse(voiceTargetParse)

    setCurrentSelectBoxName(voiceTargetObject.name);
    }
  }

  return (
    <div className="relative">
      {voiceToggle && (
        <div className="absolute z-[1] rounded-xl shadow-t-xl pb-4 bottom-9 right-0 bg-white p-3 w-[240px] h-[240px] overflow-y-scroll">
          <div className="text-[14px] py-2 font-extrabold">
            Choose Model Device
          </div>

          <div onClick={(e)=>handleVoiceTransition(e)}>
            {voices.map((val, i) => {
              return (
                <div tabIndex="0" className={`${currentSelectBoxName == val.name ? "bg-slate-300" : "bg-none" } flex items-center py-2 px-1 gap-2 active:bg-slate-200 focus:bg-slate-300 rounded-lg cursor-pointer`} key={i} data-voicess={JSON.stringify(val)}>
                  <div>
                    <BiSolidRightArrow size={14} />
                  </div>
                  <div className="flex items-start gap-1">
                    <div className="text-[14px] font-bold">{val.name}</div>
                    <div className="bg-yellow-500 px-1 py-[1px] rounded-md text-[12px]">
                      {val.gender}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        className="px-2 py-1 w-[6rem] rounded-md bg-transparent ring-1  ring-black"
        onClick={handleVoiceToggle}
      >
        <div className="flex items-center justify-between  ">
          <div className="w-[80%]">{currentSelectBoxName}</div>
          <div className="w-[20%]">
            {voiceToggle ? (
              <TiArrowSortedUp size={24} />
            ) : (
              <TiArrowSortedDown size={24} />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
