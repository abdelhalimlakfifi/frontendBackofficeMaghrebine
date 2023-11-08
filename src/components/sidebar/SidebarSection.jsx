import React, { useState } from "react";
import "primeicons/primeicons.css";

import { Link } from "react-router-dom";

function SidebarSection({ section }) {
  const [toggle, setToggle] = useState(false);

  const HandleToggle = () => {
    setToggle(!toggle);
  };

  return (
   
    <>
    
        {section.items.length == 0 ? (
            <Link 
                to={section.link}
                key={section}
                className={`flex items-center justify-between w-auto h-auto mx-3 my-2 px-2 py-2 text-figma-gray hover:bg-light-gold rounded-lg  hover:text-white hover:duration-200 duration-200 ${
                toggle && "bg-light-gold text-white"
                } `}
            >
                <div className="flex items-center space-x-4 mx-2">
                <div className="w-4">
                    <i className={section.icon}></i>
                        
                </div>
                <p className="w-full">{section.title}</p>
                </div>


            </Link>

        ) : (
            <div 
        
            key={section}
            onClick={HandleToggle}
            className={`flex items-center justify-between w-auto h-auto cursor-pointer mx-3 my-2 px-2 py-2 text-figma-gray hover:bg-light-gold rounded-lg  hover:text-white hover:duration-200 duration-200 ${
            toggle && "bg-light-gold text-white"
            } `}
        >
            <div className="flex items-center space-x-4 mx-2">
            <div className="w-4">
                <i className={section.icon}></i>
                    
            </div>
            <p className="w-full">{section.title}</p>
            </div>

            <i
            className={`pi pi-chevron-down flex justify-center ${
                toggle && "rotate-180 duration-200"
            } ${!toggle && "duration-200"} mx-2`}
            
            ></i>
        </div>
        )}

      {section.items.length > 0 ? (
            section.items.map((item, index) => (
                toggle && (
                    <Link to={item.link} key={index} className="flex items-center justify-between w-auto h-auto  mx-3 my-2 px-2 py-2 hover:text-light-gold rounded-lg  text-figma-gray hover:duration-200 duration-200">
                      <div className="flex items-center space-x-4 mx-2">
                        <div className="w-4">
                          <i className="pi pi-circle-fill text-[0.45rem]  "></i>
                        </div>
                        <p className="w-full">{item.title}</p>
                      </div>
                    </Link>
                  )
            ))
            ) : (
            <div></div>
        )}

      
    </> 
  );
}

export default SidebarSection;
