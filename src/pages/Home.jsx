import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import Sidebar from "../components/general/Sidebar";
import Navbar from "../components/general/navbar";
import SearchBar from "../components/navbar/Search"

export default function Home() {
  const { loading, error, user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-raw md:flex-col h-screen">
      <div className="flex w-full ">
        <div className="bg-red-400 w-1/5 hidden lg:block h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full md:w-4/5 ">

        <div className="shadow-md  h-[8%] flex ">
          <Navbar />
        </div>

        <div className=" h-[92%] justify-end mx-3 my-3">
            <div className="md:hidden">
            <SearchBar /> 
            </div>
                     

          <p>This is a component</p>
        </div>

        </div>
        
      </div>
    </div>
  );
}
