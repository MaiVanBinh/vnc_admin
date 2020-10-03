import React from "react";
import "./PostItem.css";
import { Link } from "react-router-dom";

const postItem = (props) => {
  
  return (
      <div className="post-card">
        <div className="img-bx">
        <Link to={"/bai-viet/" + props.post.id}><img src={props.post.image} alt="" /></Link>
        </div>
        <div className="post-content">
          <p>
            {props.post.category === "2"
              ? "THÔNG TIN MỚI"
              : "TỰ NHIÊN BÍ ẨN"}
          </p>
          <Link to={"/bai-viet/" + props.post.id}><h3>{props.post.title}</h3></Link>
          <p>{props.post.created_at}</p>
          <p>
            {props.post.description}
          </p>
        </div>
      </div>
    
  );
};

export default postItem;
