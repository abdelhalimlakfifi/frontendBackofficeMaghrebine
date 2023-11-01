import React from "react";

//import components
import Logo from "../components/confirmEmail/Logo";
import SetEmailForm from "../components/confirmEmail/SetEmailForm";
import SideImg  from "../components/confirmEmail/SideImage";


function confirmEmail() {
    return (
      <>
          <div className="w-full flex ">
              <div className=" w-full items-center flex">
                  <div id="form" className=" mx-60 w-full">
                      <Logo/>
                      <SetEmailForm />
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