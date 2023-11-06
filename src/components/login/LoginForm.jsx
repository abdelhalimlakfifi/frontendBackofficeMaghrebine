import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import PasswordInput from "../auth/PasswordInput";
import { InputText } from "primereact/inputtext"; //import primeReact styles
import Botton from "./Button"; //import components
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { Password } from "primereact/password";
import { useEffect } from "react";
import { Toast } from 'primereact/toast';


const LoginForm = () => {
    // react states
    const toast = useRef(null);
    const formRef = useRef();
    const [formError,  setFormError] = useState({})
    // redux state
    const { loading, error } = useSelector((state) => state.user);

    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message});
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultValues = { username: '', password: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;



    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    const handleLoginEvent = (data) => {
        const userCredentials = {
            username: data.username,
            password: data.password
        } 

        dispatch(loginUser(userCredentials))
            .then((result) => {
                if (result.payload.status == 200) {
                    navigate("/");
                }else if(result.payload.status == 401){
                    showError("wrong credentials")
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };
    return (
        <form className="" onSubmit={form.handleSubmit(handleLoginEvent)} >
            <Toast ref={toast} position="top-left" />
            <div className=" mt-6">
                <Controller
                    name="username"
                    control={form.control}
                    rules={{ required: 'Username is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <span className="p-float-label  text-gray-500">
                                <InputText
                                    name={field.name}
                                    className={classNames({ 'p-invalid': fieldState.error }) + " block w-full px-4 py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"}
                                    id={field.name}
                                    {...field}
                                />
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                                    Username
                                </label>
                            </span>
                            <div className=" mb-5">
                                {getFormErrorMessage(field.name)}

                            </div>
                        </>
                    )}
                />
            </div>


            <div className="mb-6">
                {/* <PasswordInput /> */}


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
                            <PasswordInput 
                                field={field}
                                name={field.name}
                                error={fieldState.error}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                
                            />
                            {/* <div className="w-full">
                                <span className="p-float-label">
                                    <Password 

                                        name="password"
                                        className={'w-full'}
                                        feedback={false} 
                                        toggleMask
                                        id={field.name}
                                        {...field}
                                    />
                                    <label htmlFor="password">Password</label>
                                </span>
                            </div> */}
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </div>
        

            <Botton type="submit" loading={loading} disabled={loading} />

            {loading && <p>Loading...</p>}
            

            <div className="w-full my-2 flex">
                <Link to="/ConfirmEmail" className="text-xs text-custom-purple hover:underline">
                Forget Password?
                </Link>
            </div>
        

        </form>
    );
};

export default LoginForm;
