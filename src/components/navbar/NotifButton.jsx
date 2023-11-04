import React from "react";
import notification from "../../assets/Notification.svg";

const NotifButton = () => {
    return (
      <>
        <img
          src={notification}
          className="h-8"
          alt="notification"
        />
      </>
    )
  }
  
  export default NotifButton;