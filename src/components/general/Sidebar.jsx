import React, {useState} from "react";
import { SidebarData } from "../sidebar/SidebarData";
import SidebarSection from "../Sidebar/SidebarSection";
import LogoIcon from "../../assets/Icons/Logo.svg";
import Navbar from "./Navbar";
import { Button } from "primereact/button";

export default function Sidebar({isOpen}) {
  return (

    <div className={`${isOpen ? "translate-x-0 duration-500" : "-translate-x-full duration-500"} lg:translate-x-0 shadow w-3/5 md:w-2/5 lg:w-1/5  h-full min-h-screen bg-white z-50`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-center">
            <img src={LogoIcon} alt="Logo" className="my-6" />
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
            <div className="w-[50%]">Logout</div>
          </div>
        </div>
      </div>

    </div>
  );
}
