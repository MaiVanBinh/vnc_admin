import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button className={'ButtonCustom ' + props.mode} onClick={props.onClickHandler}>
      {props.icon ? <i className={props.icon}></i> : null}{props.title}
    </button>
  );
};

export default Button;