import React from "react";
import "./FormCreateUpdate.css";

const FormCreateUpdate = (props) => {
  return (
    <div className="asset-detail-view">
      <div className="detail-header">
        <h3 className="title-asseet">{props.titleForm}</h3>
        <div onClick={props.onCloseHandler} style={{ cursor: "pointer" }}>
          <svg viewBox="0 0 31.112 31.112" width="20" height="20">
            <path
              fill="#333333"
              d="M31.112 1.414L29.698 0 15.556 14.142 1.414 0 0 1.414l14.142 14.142L0 29.698l1.414 1.414L15.556 16.97l14.142 14.142 1.414-1.414L16.97 15.556z"
            ></path>
          </svg>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default FormCreateUpdate;
