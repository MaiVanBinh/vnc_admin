import React from "react";
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
    default:
      linkPath = "";
  }
  // let link = props.linkPath
  //   ? "/bai-viet" +
  //     (props.linkPath ? props.linkPath : "") +
  //     "?id=" +
  //     props.post.id
  //   : "/bai-viet/" + props.post.id;
  return (
    <Link to={linkPath}>
      <li>
        {props.image ? (
          <div className="img-post">
            <img src={props.post.image} alt="" />
          </div>
        ) : null}
        <div className="title-post">
          <p href="#0">
            {props.post.title ? props.post.title : props.post.name_vn}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default itemPost;
