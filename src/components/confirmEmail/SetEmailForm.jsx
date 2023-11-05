import React, { useState,useRef  } from "react";
import {forgotPassword} from "../../store/ForgotPasswordSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import emailImage from "../../assets/email.svg"


//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";


const SetEmailForm = () => {

    const selectForgotPasswordState = (state) => state.forgotPassword;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMesasge] = useState('')
    const { loading, success, error } = useSelector(selectForgotPasswordState);

    const dispatch = useDispatch();

    
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
        if (!loading) { // Check if not loading to prevent multiple submissions
            const response = await dispatch(forgotPassword(email));
        }
    };

    useEffect(() => {
        console.log(loading, success, error);

        if(!loading)
        {
            if(error)
            {

                setErrorMesasge(error.payload.data.error ? error.payload.data.error : "500 Internal server Error")
            }
            if (success) {
                localStorage.setItem('userEmail', email)
                navigate('/InsertOtp', {state: { email: email}})
            }
        }
    }, [loading, success, error])
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
                <InputText id="email" value={email} type="email" onChange={onChangeEmail} className="p-invalid block w-full px-4 py-2 my-5 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40" />
                <label htmlFor="email">Insert Your Email</label>
            </span>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-900">{errorMessage}</p>}
            {success && <p>OTP Sent Successfuly </p>}
            <Botton  type="submit" disabled={loading} />

        </form>
    );
};

export default SetEmailForm;
