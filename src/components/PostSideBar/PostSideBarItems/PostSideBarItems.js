import React from "react";
import "./PostSideBarItems.css";
import { Link } from "react-router-dom";
import PostItem from "./ItemPost/ItemPost";

const PostSideBarItem = (props) => {
  let listPost = null;
  if (props.posts) {
    listPost = props.posts.map((post) => (
      <PostItem
        key={post.id}
        post={post}
        linkPath={props.linkPath}
        image={props.image}
        mode={props.mode}
      />
    ));
  }
  return (
    <div className="post-box">
      <div className="post-catagory">
        <h4>{props.title}</h4>
      </div>
      <ul className="list-post">{listPost}</ul>
      {props.showMore ? (
        <p>
          <Link to="/bai-viet">
            Xem thêm<i className="fa fa-angle-right"></i>
          </Link>
        </p>
      ) : null}
    </div>
  );
};

export default PostSideBarItem;
