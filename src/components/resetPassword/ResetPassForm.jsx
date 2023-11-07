import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import ResetButton from "./ResetButton";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';

const ResetPassForm = () => {
  // react states
    const defaultValues = { password: '', password_confirmation: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors
    const location = useLocation();
    const toast = useRef(null);


    const state = location.state;

    if(state)
    {
        const formRef = useRef()
        // const [error, setError] = useState();
        const navigate = useNavigate();
        const showError = (message) => {
            toast.current.show({severity:'error', summary: 'Error', detail:message});
        }
        
        const getFormErrorMessage = (name) => {
            return errors[name] ? <small className="p-error">({errors[name].message})</small> : <small className="p-error">&nbsp;</small>;
        };
        const handleSubmit = async (data) => {

            if(data.password !== data.password_confirmation)
            {
                showError("passwords Mismatch")
                return
            }
            const token = localStorage.getItem('resetPasswordToken');
            if(token)
            {
                const response = await axios.put('http://localhost:3000/api/forgotpassword/change-password',{
                    password: data.password,
                    confirmation_password: data.password_confirmation
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
            <form className="" onSubmit={form.handleSubmit(handleSubmit)} ref={formRef}>
                <Toast ref={toast} position="top-left" />
                <div className=" my-2">
                    <Controller
                        name="password"
                        control={form.control}
                        rules={{ 
                            required: 'Password is required.',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long.',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                 <div className="w-full">
                                    <span className="p-float-label">
                                        <Password 

                                            name={field.name}
                                            className={' w-full'}
                                            feedback={false} 
                                            toggleMask 
                                            id={field.name}
                                            {...field}
                                        />
                                        <label htmlFor="password">
                                            Password {getFormErrorMessage(field.name)}
                                        </label>
                                    </span>
                                </div>
                            </>
                        )}
                    />
                </div>
                <div className=" my-8">
                    <Controller
                        name="password_confirmation"
                        control={form.control}
                        rules={{ 
                            required: 'Password Confirmation is required.',
                            minLength: {
                                value: 8,
                                message: 'Password Confirmation must be at least 8 characters long.',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                 <div className="w-full mt-4">
                                    <span className="p-float-label">
                                        <Password 
                                            name={field.name}
                                            className={' w-full'}
                                            feedback={false} 
                                            toggleMask 
                                            id={field.name}
                                            {...field}
                                        />
                                        <label htmlFor="password">
                                            Password confirmation {getFormErrorMessage(field.name)}
                                        </label>
                                    </span>
                                </div>
                                
                            </>
                        )}
                    />
                </div>
    

                {/* {error ?? error} */}
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
