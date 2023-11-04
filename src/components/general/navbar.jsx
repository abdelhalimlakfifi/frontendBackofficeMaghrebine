import React from "react";
import ProfileIcon from "../navbar/ProfileIcon";
import NotifButton from "../navbar/NotifButton";
import NavbarLogo from "../navbar/NavbarLogo";
import MenuIcon from "../navbar/MenuIcon";

const Navbar = () => {
  return (
    <>
      <div className="w-full border-b-2 flex items-center px-3 py-2">

        {/* Menu */}
        <div className="w-[10%] flex justify-start">
          <MenuIcon />
        </div>

        {/* Logo */}
        <div className="w-[80%] flex justify-center">
          <NavbarLogo />
        </div>

        {/* Icons */}
        <div class="w-[30%] flex justify-end">
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
