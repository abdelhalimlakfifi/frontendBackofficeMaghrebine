import React, { useState,useRef  } from "react";
import {forgotPassword} from "../../store/ForgotPasswordSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import emailImage from "../../assets/email.svg"
import { Controller, useForm } from "react-hook-form";
//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


const SetEmailForm = () => {
    // React hook form
    const toast = useRef(null);
    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message});
    }
    const defaultValues = { email: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const selectForgotPasswordState = (state) => state.forgotPassword;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMesasge] = useState('')
    const { loading, success, error } = useSelector(selectForgotPasswordState);
    const dispatch = useDispatch();

    

    const handleSubmit = async  (data) => {

        if (!loading) { // Check if not loading to prevent multiple submissions
            setEmail(data.email)
            const response = await dispatch(forgotPassword(data.email));
        }
    };

    useEffect(() => {

        if(!loading)
        {
            if(error)
            {
                setErrorMesasge(error.payload.data.error ? error.payload.data.error : "500 Internal server Error")
                if(errorMessage) showError(errorMessage)
            }
            if (success) {
                localStorage.setItem('userEmail', email)
                navigate('/InsertOtp', {state: { email: email}})
            }
        }
    }, [loading, success, error, errorMessage])
    return (
        <form className="" onSubmit={form.handleSubmit(handleSubmit)}>
            <Toast ref={toast} position="top-left" />
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
                <Controller
                        name="email"
                        control={form.control}
                        rules={{ 
                            required: 'Email is required.',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <span className="p-float-label  text-gray-500">
                                <InputText 
                                    type="email"
                                    name={field.name}
                                    className={classNames({ 'p-invalid': fieldState.error }) + " block w-full px-4 py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"}
                                    id={field.name}
                                    {...field}
                                />
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                                    Insert Your Email
                                    </label>
                                </span>
                                <div className=" mb-5">
                                    {getFormErrorMessage(field.name)}

                                </div>
                            </>
                        )}
                    />
                
                
            </span>

            <Botton  type="submit" loading={loading} disabled={loading} />

        </form>
    );
};

export default SetEmailForm;
