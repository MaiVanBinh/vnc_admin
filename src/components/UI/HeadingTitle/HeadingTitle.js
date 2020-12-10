import React from "react";
import "./HeadingTitle.css";
import Button from "../ButtonCustom/ButtonCustom";

const HeadingTitle = (props) => {
  let style;
  switch (props.mode) {
    case "heading":
      style = "heading";
      break;
    case "subHeading":
      style = "sub-heading";
      break;
    default:
      style = "heading";
  }
  return (
    <div className={style}>
      <h3>{props.title}</h3>
      {props.filter ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button title="Lọc" />
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>6555 kết quả</p>
        </div>
      ) : null}
    </div>
  );
};

export default HeadingTitle;
