import React from "react";
import LoginForm from "../components/login/loginForm";
import SideImg from "../components/login/sideImage";
import Logo from "../components/login/logo"


function Login() {
  return (
    <>
      {/* <div className="h-screen w-full  flex">
        <div
          className="flex flex-col justify-center items-center ">
          <Logo/>
          <div className="w-full m-auto bg-white lg:max-w-xl">
            
            <LoginForm />

            <div className="relative flex items-center justify-center w-full border border-t">
              <div className="absolute mt-[30px] px-5  py-5 bg-white">Or</div>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-custom-purple hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>


      </div> */}

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