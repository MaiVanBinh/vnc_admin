import React from "react";
import {Link} from 'react-router-dom';
import './PostSideBarItem.css';
const PostSideBarItem = (props) => {
  let listPost = null;
  if (props.posts) {
    listPost = props.posts.map((post) => (
        <Link to={"/bai-viet/" + post.id} key={post.id}>
            <li >
                <div className="img-post">
                    <img src={post.image} alt="" />
                </div>
                <div className="title-post">
                    <p href="#0">{post.title}</p>
                </div>
            </li>
      </Link>
    ));
  }
  return (
    <div className="post-box">
      <div className="post-catagory">
        <h4>{props.title}</h4>
      </div>
      <ul className="list-post">
          {listPost}
      </ul>
      <p>Xem thêm<i className="fa fa-angle-right"></i></p>
    </div>
  );
};
export default PostSideBarItem;
