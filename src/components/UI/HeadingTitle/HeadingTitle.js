import React from "react";
import "./HeadingTitle.css";
import Button from "../ButtonCustom/ButtonCustom";
import Filter from './filter-results-button.svg';

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
      {props.filter && props.total ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button title="Lọc" icon={Filter} click={props.clickShowFilter}/>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>{props.total} kết quả</p>
        </div>
      ) : null}
    </div>
  );
};

export default HeadingTitle;
