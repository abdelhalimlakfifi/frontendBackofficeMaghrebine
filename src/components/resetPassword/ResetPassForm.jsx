import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/ResetPasswordSlice";
import { useNavigate } from "react-router-dom";

//import primeReact sty les
import { InputText } from "primereact/inputtext";

//import components
import ResetButton from "./ResetButton";

const ResetPassForm = () => {
  // react states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetSuccess) {
      navigate("/Login"); // Automatically navigate to the login page on reset success
    }
  }, [resetSuccess, history]);

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
      setLoading(true);

      try {
        dispatch(
          resetPassword({
            email: localStorage.getItem("userEmail"),
            newPassword,
          })
        );
        setResetSuccess(true);
        setResetError(null);
      } catch (error) {
        setResetSuccess(false);
        setResetError(error.message || "An error occurred during the reset.");
      }
    } else {
      setLoading(false);
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
            className=" block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
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
            className=" block w-full px-4 my-[2rem] py-2 text-custom-purple bg-white border-2 rounded-md focus:border-custom-purple focus:ring-custom-purple focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label htmlFor="confirmNewPassword">Confirm new password</label>
        </span>
      </div>

      {passwordMismatchError && (
        <p className="text-red-900">{passwordMismatchError}</p>
      )}

      {loading && <p>Loading ...</p>}

      {resetError && <p>{resetError}</p>}

      <ResetButton type="submit" disabled={loading} />

    </form>
  );
};

export default ResetPassForm;
