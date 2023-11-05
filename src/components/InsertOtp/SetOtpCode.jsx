import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateOTP } from "../../store/ValidateOtpSlice";
import { resendOtp  } from "../../store/ForgotPasswordSlice";
import { useLocation } from "react-router-dom";
import emailImage from "../../assets/emailSent.svg";
import OtpInputFields from "./OtpInputFields";
import { useNavigate } from "react-router-dom";
//import components
import Botton from "./Button";
import { useState } from "react";
import { useEffect } from "react";
// import ErrorMessage from "./Message";

const SetOtpForm = () => {
    const location = useLocation();
    const state = location.state;
    const [stringCode,  setStringCode] = useState('');
    
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail')

    if(state)
    {
        const dispatch = useDispatch()

        const { loading, success, error } = useSelector((state) => state.otp);
        const { resendLoading, resendSuccess, resendError } = useSelector((state) => state.forgotPassword);



        const handleOtpSubmit = async (e) => {
            e.preventDefault();

            
            dispatch(validateOTP({email, stringCode}));
        };

        useEffect(() => {

            console.log(loading, success, error)

            if(!loading)
            {
                if(error){
                    console.log(error.payload.data.error);
                }
                if(success){
                    localStorage.setItem('resetPasswordToken', success.token);
                    localStorage.removeItem('userEmail')
                    navigate('/ResetPassword', { state: { email: email}})
                }
            }
        }, [loading, success, error]);


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
                    <OtpInputFields className="" onChange={setStringCode}/>
                </div>
    
                <Botton type="submit"  disabled={loading}/>
    
                {success && <p>OTP Validation Successful </p>}
                {error && <p>{error.payload.data.error}</p>}
    
                
    
                <div className="w-full flex text-xs text-custom-purple">
                    You have not received one?
                    <button className="text-xs mx-1 !bg-transparent text-red-500 hover:underline">
                        Resend OTP
                    </button>
                </div>
            </form>
        );
    }


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-custom-color">404</h1>
                <p className="text-xl text-gray-500">Page not found</p>
                <div className="mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-custom-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >

                    </svg>
                </div>
            </div>
        </div>
    )

};

export default SetOtpForm;
