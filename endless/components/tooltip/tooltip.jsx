import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { MdWorkspacePremium } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import "./tooltip.css";
import UseStore from "../store/useStore";

const Tooltip = ({ onClick }) => {

  const {handleIsAccountSettingModal} = UseStore()

  return (
    <div className="tooltip">
      <div className="text-[12px] font-bold">
        <div className="flex items-center gap-1">
          <AiOutlineProfile size={14} />
          <div>My Profile</div>
        </div>
        <div className="flex items-center gap-1" onClick={handleIsAccountSettingModal}>
          <CiSettings size={14} />
          <div>Settings</div>
        </div>
        <div className="flex items-center gap-1">
          <MdWorkspacePremium size={14} />
          <div>Premium Plan</div>
        </div>
        <div className="flex items-center gap-1" onClick={onClick}>
          <IoMdLogOut color="red" size={14} />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
