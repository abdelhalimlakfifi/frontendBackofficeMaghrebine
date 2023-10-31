import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

//import styles
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function LoginForm() {
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
            className="p-invalid block w-full px-4 my-[20px] py-2 text-custom-purple bg-white border rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="username" className="pl-2">Username</label>
        </span>
      </div>

      <div className="">
        <span className="p-float-label  text-gray-500">
          <InputText
            id="password"
            required
            value={password}
            onChange={onChangePassword}
            className=" p-invalid block my-[30px] w-full px-4 py-2 text-custom-purple bg-white border rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="password" className="pl-2">Password</label>
        </span>
      </div>

      <a href="#" className="text-xs text-custom-purple hover:underline">
        Forget Password?
      </a>

      {/* <button type="submit">{loading ? "Loading..." : "Login"}</button> */}
      <div className="">
        {loading ? (
          <ProgressSpinner />
        ) : (
          <Button
            label="Submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-custom-purple rounded-md hover:bg-custom-purple focus:outline-none focus:bg-custom-purple"
          />
        )}
      </div>

      {error && <div>{error}</div>}
    </form>
  );
}
