import React from "react";
import LoginForm from "../components/login/loginForm";
import Logo from "../components/general/Logo";
import SideImg  from "../components/general/SideImage";

function Login() {
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


export default Login