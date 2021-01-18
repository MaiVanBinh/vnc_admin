import React from "react";
import "./WoodFormItem.css";
import { Link } from "react-router-dom";

const WoodFormItem = (props) => {
  const content = props.wood.creature ? (
    <Link to={`/sinh-vat/${props.wood.creature}`}>
      <div className="product">
        <div className="imgbox">
          <img src={props.wood.img} alt="" />
        </div>
        <div className="details">
          <h2>
            {props.wood.name_vn}
            <br />
            <span>{props.wood.name_latin}</span>
          </h2>
        </div>
      </div>
    </Link>
  ) : (
    <div className="product">
      <div className="imgbox">
        <img src={props.wood.img} alt="" />
      </div>
      <div className="details">
        <h2>
          {props.wood.name_vn}
          <br />
          <span>{props.wood.name_latin}</span>
        </h2>
      </div>
    </div>
  );
  return content;
};

export default WoodFormItem;
