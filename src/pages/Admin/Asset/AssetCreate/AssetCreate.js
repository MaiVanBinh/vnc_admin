import React, { useState } from "react";
import "./AssetCreate.css";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";

const AssetCreate = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const submitAsset = () => {
    const payload = new FormData();
    payload.append("title", title);
    payload.append("image", image[0]);
    // console.log(props.token, payload);
    props.onCreateAsset(props.token, payload);
  };

  return (
    <div class="asset-detail-view">
      <div class="detail-header">
        <h3 class="title-asseet">Tạo mới</h3>
        <div onClick={props.cancleCreate} style={{ cursor: "pointer" }}>
          <svg viewBox="0 0 31.112 31.112" width="20" height="20">
            <path
              fill="#333333"
              d="M31.112 1.414L29.698 0 15.556 14.142 1.414 0 0 1.414l14.142 14.142L0 29.698l1.414 1.414L15.556 16.97l14.142 14.142 1.414-1.414L16.97 15.556z"
            ></path>
          </svg>
        </div>
      </div>
      {props.formSubmit === "success" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <i class="far fa-check-circle" style={{fontSize: 30, color: '#3B568D'}}></i>
          <h2>Thành công</h2>
        </div>
      ) : (
        <div className="asset-create">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitAsset();
            }}
          >
            <div className="row">
              <div className="col-25">
                <label htmlFor="title">Tiêu đề:</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Tiều đề..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="image">Hình ảnh:</label>
              </div>
              <div className="col-75">
                <input
                  type="file"
                  id="image"
                  name="iamge"
                  placeholder="Hình ảnh.."
                  onChange={(e) => setImage(e.target.files)}
                />
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Gửi" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    formSubmit: state.assets.formSubmit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAsset: (token, payload) =>
      dispatch(actions.createAsset(token, payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetCreate);
