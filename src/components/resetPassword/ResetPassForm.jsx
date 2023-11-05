import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ResetButton from "./ResetButton";
import axios from "axios";


const ResetPassForm = () => {
  // react states

    const location = useLocation();
    const state = location.state;
    if(state)
    {
        const formRef = useRef()
        const [error, setError] = useState();
        const navigate = useNavigate()
        const handleSubmit = async (e) => {
            e.preventDefault();

            if(formRef.current.password.value !== formRef.current.confirmationPassword.value)
            {
                setError("passwords Mismatch")
                return
            }
            const token = localStorage.getItem('resetPasswordToken');
            if(token)
            {
                const response = await axios.put('http://localhost:3000/api/forgotpassword/change-password',{
                    password: formRef.current.password.value,
                    confirmation_password: formRef.current.confirmationPassword.value
                },{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response);
                if(response.status == 200)
                {
                    localStorage.removeItem('resetPasswordToken');
                    navigate('/login');
                }
            }
        }

        return (
            <form className="" onSubmit={handleSubmit} ref={formRef}>
                <div className="">
                    <span className="p-float-label text-gray-500">
                    <InputText
                        type="password"
                        id="newPassword"
                        required
                        name="password"
                        className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label htmlFor="newPassword">New Password</label>
                    </span>
                </div>
    
                <div className="">
                    <span className="p-float-label text-gray-500">
                    <InputText
                        type="password"
                        id="confirmNewPassword"
                        name="confirmationPassword"
                        className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label htmlFor="confirmNewPassword">Confirm new password</label>
                    </span>
                </div>
    

                {error ?? error}
                {/* // {passwordMismatchError && ( */}
                {/* //     <p className="text-red-900">{passwordMismatchError}</p> */}
                {/* // )} */}
    
                {/* // {loading && <p>Loading ...</p>} */}
    
                {/* // {resetError && <p>{resetError}</p>} */}
    
                <ResetButton type="submit" />
    
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

export default ResetPassForm;
