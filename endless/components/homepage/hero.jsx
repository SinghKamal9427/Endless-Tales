import Image from "next/image";
import TextFirst from "../../public/assets/text1.png";
import TextSecond from "../../public/assets/text2.png";
import {SecondaryButton} from "../buttons/secondaryButton"

export default function Hero() {
  return (
    <div className=" flex h-[100vh] px-20 items-center" style={{
        backgroundImage: 'url("/assets/hero-banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container mx-auto">
      <div className="  px-5 w-[50%] flex flex-col gap-4 ">
        <Image src={TextFirst} alt="Hero Banner" className="w-[100%] h-[100%]" width="auto" height="auto"/>
        <Image src={TextSecond} alt="Hero Banner" className="w-[100%] h-[100%]" width="auto" height="auto"/>
        <div className="font-bold text-white text-sm">This is your a magical place where you can create your very own exciting stories! Here, you can mix and match different story types, scenarios, artifacts, and characters to build a unique tale just for you.</div>
        <div className="flex items-center justify-center gap-2">
            <SecondaryButton 
            title="READ OTHERS STORY"
            outerstyle="bg-red-600"
            hoverTextColor="group-hover:text-black"
            innerstyle="bg-red-700"
            />
            <SecondaryButton 
            title={"CREATE OWN STORY NOW"}
            outerstyle="bg-yellow-300"
            hoverTextColor="group-hover:text-black"
            innerstyle="bg-yellow-400"
            />
        </div>
      </div>
      </div>
    </div>
  );
}
