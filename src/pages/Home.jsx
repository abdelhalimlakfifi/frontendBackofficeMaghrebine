import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import Navbar from "../components/general/navbar"

export default function Home() {
  const { loading, error, user } = useSelector((state) => state.user);

  return (
    <>

      <Navbar/>

      <div className="">
        {user !== null ? (
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  );
}
