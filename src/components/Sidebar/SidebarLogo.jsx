import React from "react";
import Minimallogo from "../../assets/MinimalLogo.svg";
import NavLogo from "../../assets/NavLogo.svg";

const FullLogo = () => {
  return (
    <>
      {/* <div className="md:hidden">
        <img src={MinimalLogo} className="h-8" alt="Minimal-Logo" />
      </div> */}

        {/* Show full logo on standard width screens */}
     
        <img src={NavLogo} className="" alt="full-logo" />
     
    </>
  );
};

const MinimalLogo = () => {
    return (
      <>
        <div className="">
          <img src={Minimallogo} className="" alt="Minimal-Logo" />
        </div>
  
       
       
      </>
    );
  };

export  {FullLogo, MinimalLogo};
