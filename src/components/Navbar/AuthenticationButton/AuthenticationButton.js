import React from "react";
import "./AuthenticationButton.css";

const authenticationButton = (props) => {
  return (
    <div className="log-sign">
      <a href="#0" className="btn transparent">
        Log in
      </a>
      <a href="#0" className="btn solid">
        Sign up
      </a>
    </div>
  );
};

export default authenticationButton;
