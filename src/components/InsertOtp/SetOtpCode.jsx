import React from "react";

import emailImage from "../../assets/emailSent.svg"
import OtpInputFields from "./OtpInputFields";

//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";


const SetOtpCode = () => {

  
   

  
  return (
    <form className="" >
      <div className="">
      <img 
        src={emailImage}
        className="w-full h-52 py-5 my-10"
        alt="Email"
      />
      </div>

      <div className="w-full my-7 flex justify-center">
          
          <p className="text-sm">Check your email for the OTP code that we have sent to you.</p>
      </div>
      <div className="w-full my-10 flex justify-center">
         <OtpInputFields className=""/>
      </div>
     
      {/* <ErrorMessage/> */}

      <Botton />

      <div className="w-full flex text-xs text-custom-purple">
        You have not received one?
        <a href="#" className="text-xs mx-1 text-red-500 hover:underline">
          Resend OTP.
        </a>
      </div>
      

    </form>
  );
};

export default SetOtpCode;
