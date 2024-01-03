import { IoMdClose } from "react-icons/io";
import UseStore from "../store/useStore";

const ModalSecondary = ({children}) => {
    const { handleIsAccountSettingModal, isAccountSettingModal  } = UseStore();

    const modalOpen =  isAccountSettingModal == true ? "block" : "hidden";
  
    return (
      <div className={`fixed inset-0 ${modalOpen} z-10`}>
        <div className="flex items-center justify-center min-h-screen ">
          <div className="fixed inset-0  backdrop-blur-sm bg-black/30 "></div>
          <div className="relative backdrop-blur-xl rounded-xl  ring-1 ring-white p-4" style={{backgroundColor:'rgba(255, 255, 255, 0.2)' }}>
            <div className="bg-white p-4 rounded-lg z-10">
              <IoMdClose
                className="absolute top-5 right-5 cursor-pointer"
                size={24}
                onClick={handleIsAccountSettingModal}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default ModalSecondary;