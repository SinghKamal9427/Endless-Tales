import { TfiMenuAlt } from "react-icons/tfi";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { RiPlayListAddFill } from "react-icons/ri";
import { FaRegShareSquare } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import SelectBoxPlayer from "../selectBox/selectBoxPlayer.jsx";
import Image from "next/image";
import axios from "axios";
import UseStore from "../store/useStore.jsx";

export default function PlayerAudio() {
  const audioRef = useRef(null);
  const [playToggle, setPlayToggle] = useState(false);
  const [togglePlaylist, settogglePlaylist] = useState(false);
  const [audioUrl, setAudioUrl] = useState();
  const [currentAudioUrl, setCurrentAudioUrl] = useState();

  const { apiUrls } = UseStore();

  const handlePlayToggle = (shouldPlay) => {
    if (shouldPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlayToggle(shouldPlay);
  };

  const handleTogglePlaylistLibrary = (selectedAudio, shouldPlay) => {
    if (selectedAudio) {
      setCurrentAudioUrl(selectedAudio);
    }
    return handlePlayToggle(shouldPlay);
  };

  const handlegetUserAudio = async () => {
    try {
      await axios.get(`${apiUrls}getUserAudio`).then((res) => {
        setAudioUrl(res.data);
        setCurrentAudioUrl(res.data[0]);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handlegetUserAudio();
  }, []);

  useEffect(() => {
    if (playToggle) {
      audioRef.current.play();
    }
  }, [currentAudioUrl]);

  const handleTogglePlaylist = () => {
    settogglePlaylist(!togglePlaylist);
  };

  return (
    <div className="fixed bottom-0 w-[100%] bg-white ">
      <div className="relative ">
        <div className="flex w-[100%] container mx-auto  bg-white items-center gap-3 justify-center px-12 py-3 z-10">
          <div className="cursor-pointer">
            <TfiMenuAlt size={30} onClick={handleTogglePlaylist} />
          </div>
          <div>
            {/*  <Image
              alt="playimage"
              src={`${apiUrls}${currentAudioUrl?.audioPath}`}
              width={100}
              height={100}
              className="rounded-lg"
            /> */}
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div>
                <audio
                  ref={audioRef}
                  onEnded={() => setPlayToggle(false)}
                  controls
                  src={`${apiUrls}${currentAudioUrl?.audioPath}`}
                  className="hidden"
                />
                {playToggle ? (
                  <FaRegCirclePause
                    size={30}
                    onClick={() => handlePlayToggle(false)}
                  />
                ) : (
                  <FaRegCirclePlay
                    size={30}
                    onClick={() => handlePlayToggle(true)}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[18px] font-bold">
                  {currentAudioUrl?.name}
                </div>
                <div className="text-[12px] font-bold">Desc</div>
              </div>
            </div>
            <div>
              <div className="font-bold">FR</div>
            </div>
          </div>

          <SelectBoxPlayer />
          <div>
            <RiPlayListAddFill size={30} />
          </div>
          <div>
            <FaRegShareSquare size={30} />
          </div>
        </div>

        {togglePlaylist && (
          <div className="bg-white w-[80%] container mx-auto  absolute bottom-20 left-1/2  transform -translate-x-1/2 p-3 rounded-lg pb-10 z-[-0] ">
            <div className="flex flex-col gap-2">
              {audioUrl?.map((val, i) => (
                <div
                  className="flex items-center justify-between rounded-lg w-full p-3 bg-slate-100"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      {playToggle && currentAudioUrl?.name == val.name ? (
                        <FaRegCirclePause
                          size={24}
                          onClick={() =>
                            handleTogglePlaylistLibrary(val, false)
                          }
                        />
                      ) : (
                        <FaRegCirclePlay
                          size={24}
                          onClick={() => handleTogglePlaylistLibrary(val, true)}
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-sm font-bold">{val.name}</div>
                      <div className="text-[10px] font-bold">Desc</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <RiPlayListAddFill size={24} />
                    </div>
                    <div>
                      <FaRegShareSquare size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
