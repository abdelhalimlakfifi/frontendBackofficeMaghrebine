import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateOTP } from "../../store/ValidateOtpSlice";
import { resendOtp  } from "../../store/ForgotPasswordSlice";

import emailImage from "../../assets/emailSent.svg";
import OtpInputFields from "./OtpInputFields";

//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";

const SetOtpForm = () => {

  const dispatch = useDispatch()

  const { loading, success, error } = useSelector((state) => state.otp);
  const { resendLoading, resendSuccess, resendError } = useSelector((state) => state.forgotPassword);

  
  const handleOtpSubmit = () => {
    // Trigger the validation action
    dispatch(validateOTP(stringCode));
  };

  const storedEmail = localStorage.getItem('userEmail');

  const handleResendOtp = async() => {
    if (!resendLoading) {
    dispatch(resendOtp(storedEmail)); // Pass the user's email as a parameter
    }
  };


  return (
    <form className="" onSubmit={handleOtpSubmit}>
      <div className="">
        <img src={emailImage} className="w-full h-52 py-5 my-10" alt="Email" />
      </div>

      <div className="w-full my-7 flex justify-center">
        <p className="text-sm">
          Check your email for the OTP code that we have sent to you.
        </p>
      </div>
      <div className="w-full my-10 flex justify-center">
        <OtpInputFields className="" />
      </div>

      <Botton type="submit"  disabled={loading}/>

      {success && <p>OTP Validation Successful </p>}

      {error && <ErrorMessage message={error} />}



      <div className="w-full flex text-xs text-custom-purple">
        You have not received one?
        <button className="text-xs mx-1 text-red-500 hover:underline" onClick={handleResendOtp} disabled={resendLoading}>
          Resend OTP
        </button>
      </div>

      {resendSuccess && <p>Resend OTP success message</p>}

      {resendError && <ErrorMessage message={resendError} />}


    </form>
  );
};

export default SetOtpForm;
