import React, { useState } from "react";
import "./SideBarItem.css";
import { Link } from "react-router-dom";
import PostItem from "./Item/Item";
import HeadingTitle from '../../UI/HeadingTitle/HeadingTitle';
import LeftArrow from '../../../assets/icons/left-arrow.png';
import RightArrow from '../../../assets/icons/right-arrow.png';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const PostSideBarItem = (props) => {
  const [page, setPage] = useState(1);
  const fetchAuthorHandler = (isNext) => {
    if(isNext) {
      props.onFetchAuthor(page + 1);
      setPage(page + 1);
    } else if(!isNext && page > 1) {
      props.onFetchAuthor(page - 1);
      setPage(page - 1);
    }
  }

  let content = null;
  if(!props.mapImage && !props.author) {
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
    content = (
      <div className="post-box">
        <div className="post-catagory">
          <HeadingTitle title={props.title} styleHeading="subHeading" />
        </div>
        <ul className="list-post">{listPost}</ul>
        {props.showMore ? (
          <p>
            <Link to={"/bai-viet?loai-bai-viet=" + (props.title === "THÔNG TIN MỚI" ? "2" : "1")}>
              Xem thêm<i className="fa fa-angle-right"></i>
            </Link>
          </p>
        ) : null}
      </div>
    );
  } else if(props.mapImage) {
    content = (
      <div className="post-box">
        <div className="post-catagory">
          <HeadingTitle title={props.title} styleHeading="subHeading" />
        </div>
        <Link to="/vuon-quoc-gia">
          <img
            src="http://vncreatures.net/images/mapnew.gif"
            style={{ width: "400px", height: "600px", border: "0" }}
            alt="map" />
        </Link>
      </div>
    );
  } else if(props.author) {
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
    content = (
      <div className="post-box">
        <div className="post-catagory">
          <HeadingTitle title={props.title} styleHeading="subHeading" />
        </div>
        <ul className="list-post">{listPost}</ul>
        <div className="sub-pagination">
          <img src={LeftArrow} alt="left arrow" onClick={() => fetchAuthorHandler(false)} />
          <img src={RightArrow} alt="left arrow" onClick={() => fetchAuthorHandler(true)}/>
        </div>
      </div>
    );
  }
  return content;
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAuthor: (page) => dispatch(actions.fetchAuthors(page))
  }
}

export default connect(null, mapDispatchToProps)(PostSideBarItem);
