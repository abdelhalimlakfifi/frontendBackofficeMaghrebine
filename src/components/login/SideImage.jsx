import React from "react";
import sideImage from "../../assets/sideImage.jpg";

const sideImg = () => {
    return (
      <>
       <div className="" style={{ width: "30%" }}>
            <img
              src={sideImage}
              className="w-full h-full filter contrast-75"
              alt="Login"
            />
          </div>
      </>
    )
  }
  
  export default sideImg;