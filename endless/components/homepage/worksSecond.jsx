"use client";
import Image from "next/image";
import BottomBanner from "../../public/assets/cloud-reverse.jpg";
import Clouds from "../../public/assets/reviewcloud.png";
import Ana from "../../public/assets/ana.png";
import Ben from "../../public/assets/ben.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WorksSecond() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <div >
      <Image src={BottomBanner} alt="TopBanner" width={"auto"} height={"auto"} className="w-[100vw]"/>
      <div
        style={{
          backgroundImage: "url('/assets/clouds.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fafafa",
          backgroundSize: "100%",
          padding:"50px"
        }}
      >
        <div className="container mx-auto px-20">
        <Slider {...settings}>
          <div>
          <div className="p-20  ">
            <div className="relative flex items-center justify-center h-[240px] w-[400px]">
              <div className="relative h-[100%]  w-[100%]">
                <Image
                  src={Clouds}
                  alt="TopBanner"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute -top-10 left-[38%] right-[48%] h-[50%] w-[28%] bg-white rounded-[40%] flex items-center justify-center">
                  <Image
                    src={Ana}
                    alt="TopBanner"
                    className="h-[90%] w-[90%]"
                    width={"auto"} height={"auto"}
                  />
                </div>
              </div>
              <div className="absolute top-[34%] text-center">
                <div className="px-24">
                  <div className="font-extrabold">Masha</div>
                  <div className="text-white font-extrabold">8 years</div>
                  <div className="text-sm">
                    I love that the stories can be about animals
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div>
          <div className=" p-20  ">
            <div className="relative flex items-center justify-center h-[240px] w-[400px]">
              <div className="relative h-[100%]  w-[100%]">
                <Image
                  src={Clouds}
                  alt="TopBanner"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute -top-10 left-[38%] right-[48%] h-[50%] w-[28%] bg-white rounded-[40%] flex items-center justify-center">
                  <Image
                    src={Ben}
                    alt="TopBanner"
                    className="h-[90%] w-[90%]"
                    width={"auto"} height={"auto"}
                  />
                </div>
              </div>
              <div className="absolute top-[34%] text-center">
                <div className="px-24">
                  <div className="font-extrabold">Ben</div>
                  <div className="text-white font-extrabold">8 years</div>
                  <div className="text-sm">
                    I love that the stories can be about animals
                  </div>
                </div>
              </div>
            </div>
          </div></div>
          <div>
          <div className="p-20   ">
            <div className="relative flex items-center justify-center h-[240px] w-[400px]">
              <div className="relative h-[100%]  w-[100%]">
                <Image
                  src={Clouds}
                  alt="TopBanner"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute -top-10 left-[38%] right-[48%] h-[50%] w-[28%] bg-white rounded-[40%] flex items-center justify-center">
                  <Image
                    src={Ana}
                    alt="TopBanner"
                    className="h-[90%] w-[90%]"
                    width={"auto"} height={"auto"}
                  />
                </div>
              </div>
              <div className="absolute top-[34%] text-center">
                <div className="px-24">
                  <div className="font-extrabold">Masha</div>
                  <div className="text-white font-extrabold">8 years</div>
                  <div className="text-sm">
                    I love that the stories can be about animals
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Slider>
        </div>
      </div>
    </div>
  );
}
