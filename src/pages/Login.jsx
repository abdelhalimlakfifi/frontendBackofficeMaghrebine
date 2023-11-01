import React from "react";
import LoginForm from "../components/login/loginForm";
import SideImg from "../components/login/sideImage";
import Logo from "../components/login/logo"


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