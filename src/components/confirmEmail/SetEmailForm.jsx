import React, { useState } from "react";
import {forgotPassword} from "../../store/ForgotPasswordSlice"
import { useDispatch, useSelector } from "react-redux";

import emailImage from "../../assets/email.svg"


//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";
import { InputText } from "primereact/inputtext";


const SetEmailForm = () => {

  const [email, setEmail] = useState("");
  const { loading, success, error } = useSelector((state) => state.otp);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };



  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    localStorage.setItem('userEmail', email); // Save the email to local storage to retreive it in the InsertOtp page
  };
  
   

  
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="">
      <img 
        src={emailImage}
        className="w-full h-52 py-5 my-10"
        alt="Email"
      />
      </div>

      <div className="w-full my-7">
          <p className=" text-base ">Forgot Your Password? </p>
          <p className="text-xs">Please enter your email Adress. You will receive a 6 digits number to create a new password.</p>
      </div>

      <span className="p-float-label text-gray-500">
        <InputText id="email" value={email} onChange={onChangeEmail} className="p-invalid block w-full px-4 py-2 my-5 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40" />
        <label htmlFor="email">Insert Your Email</label>
      </span>

      
      {/* <ErrorMessage/> */}

      <Botton />

      

    </form>
  );
};

export default SetEmailForm;
