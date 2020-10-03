import React from "react";
import './Item.css';
import { Link } from "react-router-dom";

const itemPost = (props) => {
  let linkPath = null;
  switch (props.mode) {
    case "category":
      linkPath = "/bai-viet?loai-bai-viet=" + props.post.id;
      break;
    case "ReligiousNames":
      linkPath = "/bai-viet/danh-phap?id=" + props.post.id;
      break;
    case "ScientificReports":
      linkPath = "/bai-viet/cach-viet-bao-cao-khoa-hoc?id=" + props.post.id;
      break;
    case "creatures": {
      linkPath = "/bai-viet/" + props.post.id;
      break;
    }
    case "nationalParks":
      linkPath = "/vuon-quoc-gia?vqg=" + props.post.name;
      break;
    default:
      linkPath = "";
  }

  return (
    <li>
      {props.mode === "author" ? (
        <div className="profile">
          <h3 className="cooky-user-link name">{props.post.name}</h3>
          <div className="stats">
              <span className="stats-item">
                  <span className="stats-count">24</span>
                  <span className="stats-text">Bài viết</span>
              </span>
          </div>
        </div>
      ) : (
        <Link to={linkPath}>
          {props.image ? (
            <div className="img-post">
              <img src={props.post.image} alt="" />
            </div>
          ) : null}
          <div className="title-post">
            <p>
              {props.post.title
                ? props.post.title
                : props.post.name_vn
                ? props.post.name_vn
                : props.post.name}
            </p>
          </div>
        </Link>
      )}
    </li>
  );
};

export default itemPost;
