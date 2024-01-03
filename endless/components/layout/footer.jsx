import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";





export default function Footer() {

  const router = useRouter();
  const asPath = router.asPath;

  return (
    <div
      style={{
        backgroundImage: "url('/assets/footerbg.png')",
        backgroundColor: `${asPath == "/managechoose" ? "#5fcdcd" : "#fafafa"}`,
        backgroundSize: "cover",
        width: "100%",
      }}
      className="pt-[120px] pb-[60px]"
    >
      <div className="container mx-auto flex justify-between items-start">
        <div className="w-[25%] flex  justify-center">
          <Image src={Logo} width={100} height={100} alt="logo"/>
        </div>
        <div className="flex flex-col gap-4 w-[25%] px-4">
          <div className="font-extrabold text-lg">Navigation</div>
          <div className="flex flex-col gap-2 font-semibold text-white text-sm  ">
          <div className="hover:text-black cursor-pointer">About</div>
          <div className="hover:text-black cursor-pointer">How it works</div>
          <div className="hover:text-black cursor-pointer">Contact</div>
          <div className="hover:text-black cursor-pointer">My Account</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[25%] px-4">
          <div className="font-extrabold text-lg">Contacts</div>
          <div className="flex flex-col gap-2 font-semibold text-white text-sm  ">
          <div className="hover:text-black cursor-pointer flex gap-1">
            <div><FaLocationDot size={20}/></div>
            <div> 123, Street Avenue, Newyork, USA 1001 </div></div>
          <div className="hover:text-black cursor-pointer flex gap-1"><div><IoCall size={20}/>
</div> <div>(123) 123 123 4567 </div></div>
          <div className="hover:text-black cursor-pointer flex gap-1"><div><MdEmail size={20} />
          </div><div className="break-all">endlesstales111@mail.com </div></div>
          </div>
        </div>
     
        <div className="flex flex-col gap-4 w-[25%] px-4">
          <div className="font-extrabold text-lg">Connect</div>
          <div className="flex gap-2">
            <div className="hover:text-black text-white cursor-pointer"><FaFacebookF size={20} /></div>
            <div className="hover:text-black text-white cursor-pointer"><AiFillInstagram size={20} /></div>
            <div className="hover:text-black text-white cursor-pointer"><FaTwitter size={20}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
