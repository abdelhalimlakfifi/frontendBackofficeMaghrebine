import React from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";


export default function Botton() {
  return (
    <>
      <div className="w-full  px-4 py-2 my-2 flex justify-center tracking-wide text-white transition-colors duration-200 transform bg-custom-purple rounded-md hover:bg-custom-purple focus:outline-none focus:bg-custom-purple">
        <div className="flex items-center ">
        <Link to="/InsertOtp">
            <Button label="Request Password Reset" className="text-xm" />
        </Link>        
        </div>
        
      </div>
      <div  className="flex items-center  ">
          <Link to="/Login" className="w-full my-1 underline text-xs flex justify-center text-custom-purple hover:underline">Back To Sign In</Link>
      </div>
    </>
  );
}
