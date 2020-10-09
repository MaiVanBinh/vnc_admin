import React from "react";
import "./loginBtn.css";

const loginBtn = (props) => {
  return (
    <div className="log-sign">
      <button className="btn transparent" onClick={props.onLoginHandler}>
        Đăng Nhập
      </button>
    </div>
  );
};

export default loginBtn;
