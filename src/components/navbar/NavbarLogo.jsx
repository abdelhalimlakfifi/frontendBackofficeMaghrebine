import React from "react";
import NavLogo from "../../assets/NavLogo.svg";

const NavbarLogo = () => {
    return (
      <>
        <img
          src={NavLogo}
          className="h-8 md:h-10"
          alt="notification"
        />
      </>
    )
  }
  
  export default NavbarLogo;