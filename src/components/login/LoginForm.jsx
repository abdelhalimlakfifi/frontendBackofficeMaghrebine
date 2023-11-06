import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import PasswordInput from "../auth/PasswordInput";
import { InputText } from "primereact/inputtext"; //import primeReact styles
import Botton from "./Button"; //import components
import { useRef } from "react";
import { classNames } from 'primereact/utils';


const LoginForm = () => {
    // react states
    const formRef = useRef();
    const [formError,  setFormError] = useState({})
    // redux state
    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLoginEvent = (e) => {
        e.preventDefault();
        
        const userCredentials = {
            username: formRef.current.username.value,
            password: formRef.current.password.value
        } 

        dispatch(loginUser(userCredentials))
            .then((result) => {
                if (result.payload) {
                setUsername("");
                setPassword("");
                navigate("/");
            }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };
    return (
        <form className="" onSubmit={handleLoginEvent} ref={formRef}>
            <div className=" my-6">
                <span className="p-float-label  text-gray-500">
                    <InputText
                        id="username"
                        name="username"
                        required
                        className="block w-full px-4 py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    <label htmlFor="username" className="">
                        Username
                    </label>
                </span>
                <span>error</span>

                
            </div>

            <div className="my-6">
                <PasswordInput />
                <span>error</span>
            </div>
        

            <Botton type="submit" disabled={loading} />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-900">{error}</p>}

            <div className="w-full my-2 flex">
                <Link to="/ConfirmEmail" className="text-xs text-custom-purple hover:underline">
                Forget Password?
                </Link>
            </div>
        

        </form>
    );
};

export default LoginForm;
