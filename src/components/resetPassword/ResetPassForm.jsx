import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/ResetPasswordSlice";
import { Link } from "react-router-dom";

//import primeReact sty les
import { InputText } from "primereact/inputtext";

//import components
import ResetButton from "./ResetButton";
// import ErrorMessage from "./Message";

const ResetPassForm = () => {
  // react states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);


  const dispatch = useDispatch()

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
    if (newPassword === confirmNewPassword) {
      setPasswordMismatchError(null);
      dispatch( resetPassword({ email: localStorage.getItem("userEmail"), newPassword })
    ) .then(() => {
      setResetSuccess(true);
      setResetError(null);
    })
    .catch((error) => {
      setResetSuccess(false);
      setResetError(error.message || "An error occurred during the reset.");
    });

    } else {
      setPasswordMismatchError("Passwords do not match. Please try again.");
    }
  };

  return (
    <form className="" onSubmit={handleResetEvent}>
      <div className="">
        <span className="p-float-label text-gray-500">
          <InputText
            type="password"
            id="newPassword"
            required
            value={newPassword}
            onChange={onChangeNewPassword}
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
            value={confirmNewPassword}
            onChange={onChangeConfirmNewPassword}
            className="p-invalid block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="confirmNewPassword">Confirm new password</label>
        </span>
      </div>

      {passwordMismatchError && (
        <p className="text-red-900">{passwordMismatchError}</p>
      )}

      {resetError && (<p>{resetError}</p>)}

      {resetSuccess ? (
        <p>Password reset was successful. <Link to="/Login"><ResetButton /></Link></p>
      ) : (
        <Link to="">
          <ResetButton />
        </Link>
      )}

      
    </form>
  );
};

export default ResetPassForm;
