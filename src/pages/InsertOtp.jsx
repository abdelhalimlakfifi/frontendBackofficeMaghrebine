import React from "react";

import SetOtpCode from "../components/InsertOtp/SetOtpCode";
import Logo from "../components/general/Logo";
import SideImg  from "../components/general/SideImage"; 


function confirmEmail() {
    return (
        <>
            <div className="w-full flex flex-col-reverse lg:flex-row">
                <div className="w-full items-center flex h-[75vh] lg:h-[100vh]">
                    <div id="form" className=" lg:mx-[20%] w-full mx-6">
                        <Logo/>
                        <SetOtpCode />
                    </div>
                </div>

                <div className="w-full lg:w-[48%] h-[15vh]">
                    <SideImg className=" h-full lg:h-screen w-full object-cover object-[center,70%]"/>
                </div>
            </div>
        </>
    );
}
export default confirmEmail