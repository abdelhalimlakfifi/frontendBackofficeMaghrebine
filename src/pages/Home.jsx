import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import Navbar from "../components/general/navbar";
import Sidebar from "../components/general/Sidebar";
import sidebarData from "../components/Sidebar/SidebarData";

export default function Home() {
  const { loading, error, user } = useSelector((state) => state.user);

  return (
    <>
      
      <div className="flex">
        <Sidebar sidebarData={sidebarData} />
        <div className="flex flex-col flex-grow">
           <Navbar/>
        </div>
        
        {/* <div className="">
          {user !== null ? (
            <div>
              <Link to="/profile">Profile</Link>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div> */}
      </div>
    </>
  );
}
