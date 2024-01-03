import { IoMdClose } from "react-icons/io";
import UseStore from "../store/useStore";

const Modal = ({children}) => {
  const { isAccountModal, handleIsAccountModal } = UseStore();

  const modalOpen =  isAccountModal == true ? "block" : "hidden";

  return (
    <div className={`fixed inset-0 overflow-y-auto ${modalOpen} z-10 `}>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30"></div>
        <div className="relative backdrop-blur-xl rounded-xl  ring-1 ring-white p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <div className="bg-white p-8 rounded-xl z-10 ">
            <IoMdClose
              className="absolute top-5 right-5 cursor-pointer"
              size={24}
              onClick={handleIsAccountModal}
            />
            {children}
          </div>
        </div>
    

      </div>
    </div>
  );
};

export default Modal;
