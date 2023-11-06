import React, { useState } from "react";
import Uparrow from "../../assets/icons/Uparrow.svg";
import Downarrow from "../../assets/icons/Downarrow.svg";

const SidebarSection = ({ section, open }) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  return (
    <>
      {!open && (
        <div className="w-full   flex justify-center ">
          <div className=" mr-[25%] w-[55%] h-11 bg-white rounded-md hover:bg-gold cursor-pointer flex justify-center items-center">
            <div className=" ">
              {section.icon}
            </div>
          </div>
        </div>
      )}

      {open && (<div className="w-full h-full flex justify-center px-3 py-2 md:px-2 md:py-2 ">
        <div className= {`flex items-center w-full h-14 px-7  md:px-3 md:h-12 rounded-lg hover:shadow-lg hover:text-gold  cursor-pointer ${toggled ? "bg-gold shadow-lg" : ""}`}>
          <div className=" w-[20%] h-7 md:h-7 flex justify-start ">
            {section.icon}
          </div>

          <div className=" w-[90%] h-10 md:h-7 flex items-center justify-start">
            <p
              className={`  ${toggled ? "text-white" : "text-gray"} text-xm font-medium  ${
                open ? "" : "scale-0"
              }`}
            >
              {section.title}
            </p>
          </div>

          <div
            className="w-[15%] h-11 md:h-7 flex justify-center items-center "
            onClick={handleToggle}
          >
            {!toggled && (
              <img src={Downarrow} alt="Down" className=" h-2" />
            )}
            {toggled && <img src={Uparrow} alt="Up" className="mt-2 h-5" />}
          </div>
        </div>
        
      </div>)}
      
    </>
  );
};

export default SidebarSection;
