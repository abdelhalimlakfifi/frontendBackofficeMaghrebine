import React from "react";
import profilicon from "../../assets/ProfileIcon.svg";

const ProfileIcon = () => {
    return (
      <>
        <img
          src={profilicon}
          className="h-8 md:h-10"
          alt="Profile"
        />
      </>
    )
  }
  
  export default ProfileIcon;