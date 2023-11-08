import React, { useState, useEffect } from "react";

//import Icons
import CalendarIcon from "../../assets/Icons/calendar.svg";
import DashboardIcon from "../../assets/Icons/dashboard.svg";
import LogoIcon from "../../assets/Icons/Logo.svg";
import NotificationIcon from "../../assets/Icons/notification.svg";
import ProfileIcon from "../../assets/Icons/ProfileIcon.svg";

// Create reusable Icon component
const Icon = ({ src, alt }) => {
  return <img src={src} alt={alt} className="" />;
};

// Create the NavbarIcons component
const NavbarIcons = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      
      <div className="flex items-center w-[90%]  justify-center cursor-pointer md:hidden">
        <Icon src={LogoIcon} alt="Logo" className="" />
      </div>

      <div className="flex ">
      <div className="flex mx-4 w-9 cursor-pointer">
        {isLargeScreen && (
          <Icon src={CalendarIcon} alt="Calendar" className="" />
        )}
      </div>

      <div className="flex justify-center  mx-4 w-9 cursor-pointer">
        {isLargeScreen && (
          <Icon src={DashboardIcon} alt="Dashboard" className="" />
        )}
      </div>
        <div className="w-6 flex justify-center mx-4 cursor-pointer">
          <Icon src={NotificationIcon} alt="Notification" className="" />
        </div>
        <div className="flex w-9 cursor-pointer">
          <Icon src={ProfileIcon} alt="Profile" className="" />
        </div>

       
      </div>
    </>
  );
};

export default NavbarIcons;
