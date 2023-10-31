import React from "react";
import LoginForm from "../components/login/loginForm";
import SideImg from "../components/login/sideImage";


function Login() {
  return (
    <>
      <div className="h-screen w-screen flex">
        <div
          className="flex justify-center items-center m-24"
          style={{ width: "70%" }}
        >
          <div className="w-full p-6 m-auto bg-white lg:max-w-xl">
            <LoginForm />

            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-white">Or</div>
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

        <SideImg/>

      </div>
    </>
  );
}


export default Login