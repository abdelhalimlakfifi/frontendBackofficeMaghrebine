import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import facebook from "../../assets/facebook.png"





//import styles
import { InputText } from "primereact/inputtext";

//import components
import Botton from "./Button";




const LoginForm = () => {
  // react states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // redux state
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredentials = {
      username,
      password,
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      console.log(result);
      if (result.payload) {
        setUsername("");
        setPassword("");
        navigate("/");
      }
    });
  };
  return (
    <form className="" onSubmit={handleLoginEvent}>
      <div className="">
        <span className="p-float-label  text-gray-500">
          <InputText
            id="username"
            required
            value={username}
            onChange={onChangeUsername}
            className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="username" className="pl-2">
            Username
          </label>
        </span>
      </div>

      <div className="">
        <span className="p-float-label text-gray-500">
          <InputText
            id="password"
            required
            value={password}
            onChange={onChangePassword}
            className="p-invalid block w-full px-4 py-2 my-5 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="password" className="pl-2">
            Password
          </label>
        </span>
      </div>

        {/* <Botton/> */}

      <div className="w-full my-2 flex">
        <a
          href="#"
          className="text-xs text-custom-purple hover:underline"
        >
          Forget Password?
        </a>
      </div> 
      <div className="w-full flex text-xs text-custom-purple hover:underline">
        You do not have an account?
        <a
          href="#"
          className="text-xs text-red-500 hover:underline"
        >
          Create One.
        </a>
      </div> 

      {/* {error && <div>{error}</div>} */}
      
     <Divider/>

        
     <div className="w-full  px-4 py-2 my-2 flex justify-center tracking-wide text-custom-purple  bg-white rounded-md  border-2 focus:outline-none">
        <div className="flex items-center ">
          <Button label="Google" className="text-xl" />

        </div>
      </div>
      

    </form>
  );
};

export default LoginForm;
