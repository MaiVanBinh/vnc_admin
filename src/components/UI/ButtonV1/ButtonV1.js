import React from "react";
import './ButtonV1.css';

const ButtonV1 = (props) => {
  return <button className="ButtonV1" onClick={props.clicked}>{props.title}</button>;
};

export default ButtonV1;
