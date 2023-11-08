import React, {useState} from "react";

import SearchBar from "../navbar/Search";
import Menu from "../../assets/Icons/Menu.svg";

//import Icons
import CalendarIcon from "../../assets/Icons/calendar.svg";
import DashboardIcon from "../../assets/Icons/dashboard.svg";
import NotificationIcon from "../../assets/Icons/notification.svg";
import ProfileIcon from "../../assets/Icons/ProfileIcon.svg";
import LogoIcon from "../../assets/Icons/Logo.svg";


export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen)
  }


  return (
    <nav className="flex items-center justify-between w-full px-2.5 relative lg:px-6 shadow py-2 md:py-3">

      <div className="hidden lg:block w-full">
        <SearchBar />
      </div>

      <img
        src={Menu}
        alt="Menu"
        className="w-8 h-auto lg:hidden cursor-pointer"
        onClick={handleMenuClick}

      />
      <div className="w-full absolute h-full flex items-center justify-center lg:hidden cursor-pointer">
        <img src={LogoIcon} alt="Logo" className=" md:w-32 h-auto " />
      </div>

      <div className="w-2/5 h-full flex justify-end items-center gap-4 lg:gap-8 ">
        <img src={DashboardIcon} alt="Dashboard" className="hidden lg:block cursor-pointer " />
        <img src={CalendarIcon} alt="Calendar" className="hidden lg:block cursor-pointer" />
        <img src={NotificationIcon} alt="Notification" className="cursor-pointer" />
        <img src={ProfileIcon} alt="Profile" className="cursor-pointer" />
      </div>
    </nav>
  );
}
