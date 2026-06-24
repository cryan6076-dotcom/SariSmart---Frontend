import React from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children }) => {
  return (
    <div className="phone-wrapper">
      <div className="phone-shell">
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;