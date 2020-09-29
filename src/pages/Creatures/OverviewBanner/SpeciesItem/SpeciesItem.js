import React from "react";
import image from "../../../../assets/Species/animal.jpg";
import "./SpeciesItem.css";
import { Link } from 'react-router-dom';

const speciesItem = (props) => {
  return (
    <div className={props.isReverse ? "card row" : "card reverse"}>
      <div className="imgBx">
        <img src={image} alt="" />
      </div>
      <div className="contentBx">
        <div className="content">
          <h2>{props.overview.title}</h2>
          <p>{props.overview.description}</p>
          <Link to={"/bai-viet/" + props.overview.id } >Đọc thêm</Link>
        </div>
      </div>
    </div>
  );
};

export default speciesItem;
