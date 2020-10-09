import React from "react";
import './CreatureItem.css';

const creaturesItem = (props) => {
  return (
    <div className="card">
      <div className="imgBox">
        <img
          src={props.creature.avatar}
          alt=""
        />
      </div>
      <div className="content">
        <h2 style={{ color: "#006600" }}>{props.creature.name_vn}</h2>
        <p>
          <span>Tên Latin:</span>{" "}
          <span style={{ color: "#990000" }}>
            <i>{props.creature.name_latin}</i>
          </span>
        </p>
        <p>
          <span>Họ:</span>{" "}
          <span>
            <b>{props.creature.family_vn}</b>
          </span>
        </p>
        <p>
          <span>Bộ:</span>{" "}
          <span>
            <b>{props.creature.order_vn}</b>
          </span>
        </p>
        <p>
          <span>Lớp:</span>{" "}
          <span>
            <b>{props.creature.group_vn}</b>
          </span>
        </p>
      </div>
      <h2 className="name" style={{ color: "#006600" }}>
        {props.creature.name_vn}
      </h2>
    </div>
  );
};

export default creaturesItem;
