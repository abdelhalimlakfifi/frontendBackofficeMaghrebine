import React from "react";

//import components
import Logo from "../components/confirmEmail/Logo";
import LoginForm from "../components/confirmEmail/LoginForm";
import SideImg  from "../components/confirmEmail/SideImage";


function confirmEmail() {
    return (
      <>
          <div className="w-full flex ">
              <div className=" w-full items-center flex">
                  <div id="form" className=" mx-60 w-full">
                      <Logo/>
                      <LoginForm />
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