import React from "react";
import { useState } from "react";
import { FullLogo, MinimalLogo } from "../../components/Sidebar/SidebarLogo";
import LeftArrow from "../../assets/LeftArrow.svg";
import SidebarSection from "../Sidebar/SidebarSection";
import Logout from "../Sidebar/LogoutButton"

export default function Sidebar({ sidebarData }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div
        className={`${
          open ? "w-[22rem] md:w-[20%]" : "w-[4.5rem] md:w-[5%]"
        } duration-300 h-screen rounded-md shadow-xl py-3 px-1 fixed bg-white !mt-0`}
      >
        <div className="flex  w-full ">
          <div className="w-[80%]  flex justify-center">
            {open ? <FullLogo className="h-10" /> : <MinimalLogo />}
          </div>
          <div className=" w-[30%] flex justify-end py-2  cursor-pointer md:h-9">
            <img
              src={LeftArrow}
              className={` ${!open && "rotate-180 duration-300 "}`}
              alt="arrow"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>

        <div>
          {sidebarData.map((section, index) => (
            <SidebarSection key={index} section={section} open={open}  />
          ))}
        </div>
       
        
          <div className="w-full  flex justify-center px-3 py-5 md:px-2 md:py-7">
              <Logout open={open} />
          </div>
      
       
        
        

      </div>
      
    </>
  );
}
