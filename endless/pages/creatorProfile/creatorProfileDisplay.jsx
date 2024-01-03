import Image from "next/image";
import user from "../../public/assets/profile-pic.png";
import badge from "../../public/assets/badge1.png";
import storyPic from "../../public/assets/img1.png";

export default function CreatorProfileDisplay() {
  return (
    <div className="py-20 px-8 flex justify-center bg-[#fafafa]">
      <div className="flex gap-4 justify-center w-[70%]">
        <div className="bg-white shadow-lg w-[20%] rounded-xl ">
          <div className="flex flex-col items-center  px-4  translate-y-[-30px]">
            <div className="">
              <Image
                src={user}
                width={60}
                height={60}
                className="rounded-[100%]  "
              />
            </div>
            <div className="flex flex-col gap-1 items-center justify-center py-2">
              <div className="font-bold">Roblox</div>
              <div className="text-sky-300 font-extrabold text-[13px]">
                Creator Level
              </div>
              <div className="font-extrabold text-[11px]">(Building Bard)</div>
              <div>
                <Image src={badge} width={20} height={20} />
              </div>
              <div className="flex whitespace-nowrap  font-extrabold text-[11px]">
                <div className="border-r-2 px-2">12 Stories</div>
                <div className="border-l-1 px-2">70 Points</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[80%] rounded-xl  ">
          <div className="bg-[#fafafa] border-2 border-gray-200 rounded-t-xl  py-2 px-2 inline-block relative ">
            <div className="text-[12px] font-extrabold">Stories</div>
            <div className="bg-[#fafafa] h-[12px] w-[100%] absolute bottom-[-5px] left-0"></div>
          </div>

          <div className="bg-[#fafafa] border-2 border-gray-200 rounded-r-xl rounded-b-xl p-4 flex flex-col items-center">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white shadow-xl rounded-xl ">
                <div className="h-[70%]">
                  <Image
                    src={storyPic}
                    className="rounded-xl w-[100%] h-[100%]"
                  />
                </div>
                <div className="flex flex-col justify-between h-[30%] py-4">
                  <div className="text-[12px] font-extrabold">
                    Ch:1 Butty Is Also Could Be A Cures
                  </div>
                  <div className="text-[11px] font-extrabold">
                    butty is also could be a cures
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
                <div className="flex gap-1 items-center justify-center">
                  <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
                    Load More...
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
