import StepBar from "../../components/stepbar/stepbar";
import StepFirst from "../../components/steps/stepFirst";
import StepSecond from "../../components/steps/stepSecond";

export default function StorySteps() {
  

  return (
    <div
      style={{ backgroundColor: "#ffbf24" }}
      className="flex flex-col items-center py-10"
    >
      <div className="flex flex-col gap-8 items-center justify-center">
       {/*  <div>
          <StepFirst />
          <StepSecond/> 
        </div> */}

        {/* <div>
          <button className="bg-[#ffffff34] px-8 py-2 rounded-xl group hover:bg-[#02b7ff]">
            <div className="font-bold group-hover:text-white ">Skip</div>
          </button>
        </div> */}
        <div>
          <StepBar/>
        </div>
      </div>
    </div>
  );
}
