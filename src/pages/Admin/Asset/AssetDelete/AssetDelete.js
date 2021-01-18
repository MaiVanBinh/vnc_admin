import React from "react";
import "./AssetDelete.css";

const AssetDelete = (props) => {
  return (
    <div class="asset-detail-view">
      <div class="detail-header">
        <h3 class="title-asseet">
          Delete
        </h3>
        <div onClick={props.onCloseHandler} style={{ cursor: "pointer" }}>
          <svg viewBox="0 0 31.112 31.112" width="20" height="20">
            <path
              fill="#333333"
              d="M31.112 1.414L29.698 0 15.556 14.142 1.414 0 0 1.414l14.142 14.142L0 29.698l1.414 1.414L15.556 16.97l14.142 14.142 1.414-1.414L16.97 15.556z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="asset-detail">
        <div class="asset-info-com asset-img">
          <img src={props.asset && props.asset.url ? props.asset.url : null} alt="" />
        </div>
        <div class="asset-info-com">
          <div class="group-info">
            <h3 class="title-asset-info">Url:</h3>
            <p class="content-asset-info">
              {props.asset && props.asset.url ? props.asset.url : "Url"}
            </p>
          </div>
          <div class="group-info">
            <h3 class="title-asset-info">Extension:</h3>
            <p class="content-asset-info">
              {props.asset && props.asset.url
                ? props.asset.url
                    .split("/")
                    [props.asset.url.split("/").length - 1].split(".")[1]
                : "Extension"}
            </p>
          </div>
          <div class="group-info">
            <h3 class="title-asset-info">Size:</h3>
            <p class="content-asset-info">
              {props.asset && props.asset.size ? props.asset.size : null}
            </p>
          </div>
        </div>
        <div class="asset-info-com">
          <div class="group-info">
            <h3 class="title-asset-info">Copyright:</h3>
            <p class="content-asset-info">
              {props.asset && props.asset.copyright
                ? props.asset.copyright
                : null}
            </p>
          </div>
          <div class="group-info">
            <h3 class="title-asset-info">MIME Type:</h3>
            <p class="content-asset-info">
              {props.asset && props.asset.mime_type
                ? props.asset.mime_type
                : null}
            </p>
          </div>
          <div class="group-info">
            <h3 class="title-asset-info">Resolution:</h3>
              <p class="content-asset-info">{props.asset && props.asset.width && props.asset.hight
                ? props.asset.width + '&times;' + props.asset.hight
                : null}</p>
          </div>
        </div>
        <div class="asset-info-com"></div>
      </div>
      <div class="asset-footer">
        <div>
          <button onClick={() => props.deleteClick(props.asset)}>Delete</button>
          <button onClick={props.onCloseHandler}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default AssetDelete;
