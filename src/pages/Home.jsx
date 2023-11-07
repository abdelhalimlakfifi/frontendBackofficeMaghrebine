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
        <div className="w-screen">
            <Sidebar sidebarData={sidebarData} />
            <div className="">
                <div className="">
                    <Navbar />
                    <div className=" pt-[4.5rem] ml-[4.5rem]" id="content">
                        <p className="font-plusjakarta">Hello Am the lwa3er lore</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
