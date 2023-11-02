import React, { useState } from "react";

import { OTP } from "react-custom-otp";
import "react-custom-otp/dist/index.css";

export default function OtpInputFields({className}) {
  const [stringCode, setStringCode] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  return (
    <>
      <OTP
        inputsClasses="custom-inputs"
        inputsStyles={{ background: "", color: "#655445" }}
        containerClasses="otp-container"
        containerStyles={{ background: "" }}
        inputsNumber={6}
        setStringCode={setStringCode}
        setSubmitStatus={setSubmitStatus}
        separator={<span>-</span>}
        className={className}
      />
    </>
  );
}
