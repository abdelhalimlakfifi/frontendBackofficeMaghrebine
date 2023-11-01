import {configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import forgotPasswordReducer from './ForgotPasswordSlice'



const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotPasswordReducer
    }
})


export default store 