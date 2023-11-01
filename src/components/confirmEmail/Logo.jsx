import React from "react";
import logoImg from "../../assets/Maghrebin_logo.svg"

const Logo = () => {
    return (
        <>
            <div className="w-full flex justify-center ">
                <img
                     src={logoImg}
                     className=" w-72"
                     alt="Login" 
                />
            </div>

        </>
    )
}

export default Logo;        