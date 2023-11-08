import React from "react";
import { SidebarData } from "../sidebar/SidebarData";
import SidebarSection from "../Sidebar/SidebarSection";
import LogoIcon from "../../assets/Icons/Logo.svg";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-center w-">
          <img src={LogoIcon} alt="Logo" className="lg:my-5" />
        </div>

        {SidebarData.map((section, index) => (
          <SidebarSection section={section} key={index} />
        ))}
      </div>

    {/* Logout Button */}
      <div className="flex items-center justify-between w-auto h-auto cursor-pointer mx-3 my-2 px-2 py-2 text-figma-gray hover:bg-light-gold rounded-lg  hover:text-white hover:duration-200 duration-200 ">
        <div className="flex items-center space-x-4 mx-2">
          <div className="w-4">
            <i className="pi pi-sign-out flex justify-center"></i>
          </div>
          <p className="w-[50%]">Logout</p>
        </div>
      </div>
    </div>
  );
}
