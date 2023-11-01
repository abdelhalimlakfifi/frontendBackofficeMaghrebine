import React from "react";
import { Button } from "primereact/button";

import 'primeicons/primeicons.css';

export default function Botton() {
  return (
    <>
      <div className="w-full  px-4 py-2 my-2 flex justify-center tracking-wide text-white transition-colors duration-200 transform bg-custom-purple rounded-md hover:bg-custom-purple focus:outline-none focus:bg-custom-purple">
        <div className="flex items-center ">
          <Button label="Login" className="text-xl" />
          <i className="pi pi-sign-in  ml-5"></i>
        </div>
      </div>
    </>
  );
}
