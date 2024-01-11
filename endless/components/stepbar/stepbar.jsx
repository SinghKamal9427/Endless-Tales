import React, { useState } from "react";
import "./stepbar.css";
import StepFirst from "../steps/stepFirst";
import StepSecond from "../steps/stepSecond";
import StepThird from "../steps/stepThird";
import StepForth from "../steps/stepForth";
import StepFifth from "../steps/stepFifth";
import StepSixth from "../steps/stepSixth";
import StepSeventh from "../steps/stepSeventh";

const StepBar = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onPrev = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep !== list.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const list = [
    <StepFirst onNext={onNext} key={1}/>,
    <StepSecond onNext={onNext} key={2}/>,
    <StepThird onNext={onNext} key={3}/>,
    <StepForth onNext={onNext} key={4}/>,
    <StepFifth onNext={onNext} key={5}/>,
    <StepSixth onNext={onNext} key={6}/>,
    <StepSeventh onNext={onNext} key={7}/>,
  ];

  const stepsCount = list.length;
  const steps = [];

  for (let i = 0; i < stepsCount; i++) {
    steps.push(
      <div
        onClick={() => setCurrentStep(i)}
        className={`steps ${currentStep >= i && "active" } ${
          currentStep > i && "completed"
        }`}
        key={i}
      >
        {i + 1}
      </div>
    );
  }

  const progressLineWidth = (100 / (list.length - 1)) * currentStep;

  return (
    <section className="stepper">
      <div className="steps-container">
        <div
          className="progress-line"
          style={{ width: `${progressLineWidth}%` }}
        ></div>
      </div>
      <div>{list[currentStep]}</div>

      <div className="flex items-center justify-center py-8 gap-2">
        {currentStep !== 6 && (
          <>
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                className="bg-[#ffffff34] px-8 py-2 rounded-xl group hover:bg-[#02b7ff]"
              >
                <div className="font-bold group-hover:text-white ">Back</div>
              </button>
            )}
            <button
              onClick={onNext}
              className="bg-[#ffffff34] px-8 py-2 rounded-xl group hover:bg-[#02b7ff]"
            >
              <div className="font-bold group-hover:text-white ">Skip</div>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-10">{steps}</div>
    </section>
  );
};

export default StepBar;
