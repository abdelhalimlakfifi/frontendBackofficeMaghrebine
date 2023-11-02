import {configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import forgotPasswordReducer from './ForgotPasswordSlice'
import otpReducer from "./ValidateOtpSlice"



const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotPasswordReducer,
        otp: otpReducer
    }
})


export default store 