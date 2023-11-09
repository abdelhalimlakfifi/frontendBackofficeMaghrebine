import React, {useState} from "react";

import SearchBar from "../navbar/Search";
import Menu from "../../assets/Icons/Menu.svg";

//import Icons

import ProfileIcon from "../../assets/Icons/ProfileIcon.svg";
import LogoIcon from "../../assets/Icons/Logo.svg";

import { Button } from 'primereact/button';
        

export default function Navbar({handleMenuClick}) {

  return (
    <nav className="flex items-center justify-between w-full px-2.5 relative lg:px-6 shadow py-2 md:py-3">

      <div className="hidden lg:block w-full">
        <SearchBar />
      </div>
            

      <button onClick={handleMenuClick} >
        <img
          src={Menu}
          alt="Menu"
          className="w-8 h-auto lg:hidden "
          
        />
      </button>

      <div className="w-full h-full flex items-center justify-center lg:hidden cursor-pointer">
        <img src={LogoIcon} alt="Logo" className=" md:w-32 h-auto " />
      </div>

      <div className="w-2/5 h-full flex justify-end items-center gap-4 lg:gap-8 text-figma-gray">
      <i className="pi pi-calendar hidden lg:block cursor-pointer hover:text-light-gold" alt="Dashboard"></i>
      <i className="pi pi-th-large hidden lg:block cursor-pointer hover:text-light-gold" alt="Calendar"></i>
      <i className="pi pi-bell cursor-pointer hover:text-light-gold " alt="Notification"></i>
        {/* <img src={DashboardIcon} alt="Dashboard" className="hidden lg:block cursor-pointer " />
        <img src={CalendarIcon} alt="Calendar" className="hidden lg:block cursor-pointer" />
        <img src={NotificationIcon} alt="Notification" className="cursor-pointer" /> */}
        <img src={ProfileIcon} alt="Profile" className="cursor-pointer " />
      </div>
    </nav>
  );
}
