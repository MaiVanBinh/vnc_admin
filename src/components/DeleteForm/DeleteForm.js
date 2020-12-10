import React from "react";
import "./DeleteForm.css";
import ButtonV1 from "../UI/ButtonV1/ButtonV1";

const DeleteForm = (props) => {
  return (
    <div className="form-delete">
      {props.deleteSuccess ? (
        <h3 style={{ fontSize: "18px" }}>
          <span
            style={{ color: "#3B568D", fontWeight: "bold", fontSize: "20px" }}
          >
            DELETE SUCCESS
          </span>{" "}
        </h3>
      ) : (
        <h3 style={{ fontSize: "18px" }}>
          You want to delete:{" "}
          <span
            style={{ color: "#3B568D", fontWeight: "bold", fontSize: "20px" }}
          >
            {props.title}
          </span>{" "}
        </h3>
      )}
      {props.deleteSuccess ? null : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonV1 title="Delete" clicked={props.confimDelete} />
          <ButtonV1 title="Cancel" clicked={props.cancleDelete} />
        </div>
      )}
    </div>
  );
};

export default DeleteForm;
