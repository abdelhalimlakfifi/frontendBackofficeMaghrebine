import React, { useState } from "react";

import { Link } from "react-router-dom";

//import primeReact styles
import { InputText } from 'primereact/inputtext';

//import components
import Botton from "./Button";
// import ErrorMessage from "./Message";

const ResetPassForm = () => {
  // react states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };

  const onChangeConfirmNewPassword = (e) => {
    const confirmNewPassword = e.target.value;
    setConfirmNewPassword(confirmNewPassword);
  };

  const handleResetEvent = (e) => {
    e.preventDefault();
  };

  return (
    <form className="" onSubmit={handleResetEvent}>
      <div className="">
        <span className="p-float-label  text-gray-500">
          <InputText
            id="newPassword"
            required
            value={newPassword}
            onChange={onChangeNewPassword}
            className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="newPassword" className="">
            New password
          </label>
        </span>
      </div>

      <div className="">
        <span className="p-float-label text-gray-500">
          <InputText
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={onChangeConfirmNewPassword}
            className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="confirmNewPassword">Confirm new password</label>
        </span>
      </div>

      {/* <ErrorMessage/> */}

      <Botton />

    </form>
  );
};

export default ResetPassForm;
