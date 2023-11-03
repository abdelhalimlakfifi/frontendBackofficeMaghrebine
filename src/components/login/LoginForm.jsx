import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



//import primeReact styles
import { InputText } from "primereact/inputtext";


//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";

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
          <label htmlFor="username" className="">
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
          <label htmlFor="password" className="">
            Password
          </label>
        </span>
      </div>
     

      <Botton type="submit" disabled={loading} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-900">{error}</p>}

      <div className="w-full my-2 flex">
        <Link to="/ConfirmEmail" className="text-xs text-custom-purple hover:underline">
          Forget Password?
        </Link>
      </div>
      <div className="w-full flex text-xs text-custom-purple">
        You do not have an account?
        <Link to="/Register" className="text-xs mx-1 text-red-500 hover:underline">
          Create One.
        </Link>
      </div>

    </form>
  );
};

export default LoginForm;
