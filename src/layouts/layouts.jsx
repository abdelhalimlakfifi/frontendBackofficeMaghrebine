import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import Sidebar from "../components/general/Sidebar";
import Navbar from "../components/general/Navbar";
import SearchBar from "../components/navbar/Search";


export default function Layout({children}) {
    let [isOpen, setIsOpen] = useState(false);

    function handleMenuClick () {
            setIsOpen(!isOpen)
    }

    function closeSidebar () {
        setIsOpen(false)
    }

    return (
        <div className="flex flex-raw md:flex-col h-screen">
            <div className="flex w-full  ">
                <Sidebar isOpen={isOpen} />
                <div className="flex flex-col w-full fixed lg:static lg:w-4/5 ">

                    {isOpen && (
                        <div className="w-full h-screen absolute bg-black opacity-80 z-50 duration-500 ease-in-out" onClick={closeSidebar}>
                        
                        </div>
                    )}
                    <div className="z-10">
                        <Navbar handleMenuClick={handleMenuClick} />
                        <div className="  justify-end mx-3 my-3">
                            <div className="lg:hidden">
                                <SearchBar/>
                            </div>
                            <div className="w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
