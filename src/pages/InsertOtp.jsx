import React from "react";

import SetOtpCode from "../components/InsertOtp/SetOtpCode";
import Logo from "../components/general/Logo";
import SideImg  from "../components/general/SideImage"; 


function confirmEmail() {
    return (
      <>
          <div className="w-full flex ">
              <div className=" w-full items-center flex">
                  <div id="form" className=" mx-60 w-full">
                      <Logo/>
                      <SetOtpCode />
                  </div>
              </div>
  
              <div className="w-[48%]">
                  <SideImg className="h-screen w-full"/>
              </div>
          </div>
      </>
    );
  }
  
  
  export default confirmEmail