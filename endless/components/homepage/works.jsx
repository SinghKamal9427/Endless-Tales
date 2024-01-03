import Image from "next/image";
import React from "react";
import TopBanner from "../../public/assets/top-banner1.png";
import worksData from "../constants/utilis.json";

export default function Works() {
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffbf24",
        width: "100%",
      }}
    >
      <Image src={TopBanner} alt="TopBanner" className="w-[100vw]" width={"auto"} height={"auto"} />

      <div className="container mx-auto flex items-center justify-center text-center px-20">
        <div>
          <div className="font-black text-2xl">How It Works</div>
          <div className="flex gap-12">
            {worksData?.map((val, i) => {
              return (
                <div
                  key={i}
                  className=" max-w-[300px] max-h-[600px] rounded-2xl flex items-center justify-center my-10 ring-1 ring-white"
                  style={{ backgroundColor: "rgba(225,225,225,0.2)" }}
                >
                  <div className="bg-[#8ce2e6]   w-[90%] h-[90%] rounded-2xl text-white flex flex-col items-center ">
                    <div className="px-4 h-[33.33%] py-4">
                      {" "}
                      <Image
                        src={val.icon}
                        height={100}
                        width={50}
                        alt="TopBanner"
                        className="h-[60px]"
                      />
                    </div>
                    <div className="font-extrabold px-4 py-4 h-[20%]">
                      {val.head}
                    </div>
                    <div className="text-[0.7em] px-4  py-4 h-[46.66%]">
                      {val.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
