import React from "react";
import { InputText } from "primereact/inputtext";
import ProfileIcon from "../navbar/ProfileIcon";
import NotifButton from "../navbar/NotifButton";
import MenuIcon from "../navbar/MenuIcon";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-14 shadow flex items-center px-3 py-2 bg-white  top-0 right-0">
        {/* search */}
        {/* <span className="w-[70%] md:w-[90%] flex justify-start">
          <span className=" text-gray">
            <InputText
              id="Search"
              type="text"
              placeholder="Search..."
              className="block w-full  py-1 px-4  text-gray bg-white border focus:border-y-slate-500 rounded-md focus:shadow-xs focus:shadow-gold "
            />
          </span>
        </span> */}

        {/* Icons */}
        <div class="w-[100%] md:w-[90%]  flex justify-end">
          <div className="flex space-x-5">
            <NotifButton />
            <ProfileIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
