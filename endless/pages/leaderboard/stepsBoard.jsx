import { useState } from "react";
import Creators from "../../components/stepsBoard.jsx/creators";

export default function StepsBoard() {
    const [currentStep , setCurrentStep] = useState("creators")

    const handleSteps = (step) => {
        setCurrentStep(step)
    }

  return (
    <div style={{
        backgroundColor:'#fafafa'
    }} className="p-10">
    <div className="flex items-center justify-center gap-8 py-10">
      <button className={`  px-4 py-2 ring-1 ring-black rounded-lg text-black ${currentStep == "creators" ?'bg-sky-300  scale-125' :" bg-transparent"}`} onClick={()=>handleSteps("creators")}>
        <div className="font-bold">Creators</div>
      </button>

      <button className={` px-4 py-2 ring-1 ring-black rounded-lg text-black ${ currentStep == "listeners" ? 'bg-yellow-500 scale-125' : ' bg-transparent'}`} onClick={()=>handleSteps("listeners")}>
        <div className="font-bold">Listeners</div>
      </button>

      <button className={`  px-4 py-2 ring-1 ring-black rounded-lg  ${currentStep == "newUsers" ? ' bg-black text-white scale-125' : 'bg-transparent text-black'}`} onClick={()=>handleSteps("newUsers")}>
        <div className="font-bold">New Users</div>
      </button>
    </div>
    <Creators step={currentStep}/>
    </div>
  );
}
