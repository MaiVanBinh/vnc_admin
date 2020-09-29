import React from "react";
import './ButtonCustom.css';

const buttonCustom = (props) => {
  return (
    <button className="button-custom" type={props.typeBt} onClick={props.onClickHandle}>
      {props.title}
      <span></span>
    </button>
  );
};

export default buttonCustom;