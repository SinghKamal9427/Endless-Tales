import React, { useState } from "react";
import ModalTeritary from "../modal/modalTeritary.jsx";
import MyPlaylist from "./myPlaylist.jsx";
import UserStories from "./userStories.jsx";

export default function UserCreatedStoriesSteps() {
  const [activeStoriesStep, setActiveStoriesStep] = useState("createdStories");

  const handleCreatedStoriesToggle = (step) => {
    setActiveStoriesStep(step);
  };

  return (
    <>
      <ModalTeritary>
        <div
          className={`text-md font-bold ${
            activeStoriesStep == "createdStories" && "border border-gray-300"
          }  px-4 inline-block p-2 rounded-t-lg border-b-0 relative cursor-pointer`}
          onClick={() => handleCreatedStoriesToggle("createdStories")}
        >
          My Created Stories
          {activeStoriesStep == "createdStories" && (
            <div className="absolute w-[100%] left-0 -bottom-1  bg-white h-[4px] z-1"></div>
          )}
        </div>
        
        <div
          className={`text-md font-bold ${
            activeStoriesStep == "myPlaylist" && "border border-gray-300"
          }  px-4 inline-block p-2 rounded-t-lg border-b-0 relative cursor-pointer`}
          onClick={() => handleCreatedStoriesToggle("myPlaylist")}
        >
          My Playlist
          {activeStoriesStep == "myPlaylist" && (
            <div className="absolute w-[100%] left-0 -bottom-1  bg-white h-[4px] z-1"></div>
          )}
        </div>
        {activeStoriesStep == "createdStories" && <UserStories />}
        {activeStoriesStep == "myPlaylist" && <MyPlaylist />}
      </ModalTeritary>
    </>
  );
}
