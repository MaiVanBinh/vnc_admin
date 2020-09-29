import React from "react";
import "./HashTagLink.css";
import { Link } from "react-router-dom";
const hashTagItem = (props) => {
  return (
    <Link
      to={{
        pathname: "/sinh-vat/nhan-dang",
        search: "?id=" + props.id,
      }}
      className="hashtag-item"
    >
      {props.title}
    </Link>
  );
};
export default hashTagItem;
