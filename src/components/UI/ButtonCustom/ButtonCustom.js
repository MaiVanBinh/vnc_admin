import React from "react";
import './ButtonCustom.css';

const buttonCustom = (props) => {
  return (
    <button className="button-custom" type={props.typeBt} onClick={props.click}>
      {props.icon ? <img src={props.icon} className="filter-icon" alt={props.icon}/> : null}
      {props.title}
    </button>
  );
};

export default buttonCustom;