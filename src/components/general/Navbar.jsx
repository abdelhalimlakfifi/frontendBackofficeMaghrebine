import React from "react";

import SearchBar from "../navbar/Search";
import Menu from "../../assets/Icons/Menu.svg";
import NavbarIcons from "../navbar/NavbarIcons";

export default function Navbar() {
  return (
    <div className="flex items-center w-full">
      <div className="hidden md:block w-[80%] mx-2">
        <SearchBar />
      </div>

      <div className="md:hidden w-[8%] flex justify-center">
        <img src={Menu} alt="Menu" className="" />
      </div>
      
      <div className="flex w-[90%] md:w-[20%] mr-2">
        <NavbarIcons/>
      </div>
      

    </div>
  );
}
