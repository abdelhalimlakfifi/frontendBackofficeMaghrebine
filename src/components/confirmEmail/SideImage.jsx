import React from "react";
import sideImage from "../../assets/sideImage.jpg";

const sideImg = ({className}) => {
    return (
      <>
        <img
          src={sideImage}
          className={className}
          alt="Login"
        />
      </>
    )
  }
  
  export default sideImg;