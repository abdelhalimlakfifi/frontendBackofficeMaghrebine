import React from "react";
import { Button } from "primereact/button";
import { useState } from "react";
import 'primeicons/primeicons.css';

export default function Botton({loading}) {
   
    return (
        <>
            {/* <div className="w-full  px-4 py-2 my-2 flex justify-center tracking-wide text-white transition-colors duration-200 transform bg-custom-purple rounded-md hover:bg-custom-purple focus:outline-none focus:bg-custom-purple">
                <div className="flex items-center ">
            
                </div>
            </div> */}
            <Button 
                label="Login" 
                type="submit" 
                iconPos="right" 
                icon="pi pi-check-square" 
                className="text-xm w-full bg-custom-purple hover:bg-custom-purple focus:outline-none focus:bg-custom-purple"
                loading={loading}
            />
        </>
    );
}
