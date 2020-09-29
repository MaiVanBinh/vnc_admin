import React, { useEffect, useState } from "react";
import "./Posts.css";
import { connect } from "react-redux";
import PostItem from "./PostItem/PostItem";
import PostSideBar from '../../components/PostSideBar/PostSideBar';
import * as actions from "../../store/actions/index";
import Panigation from "../../components/Panigation/Panigation";
import { useLocation } from "react-router-dom";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from '../../components/Layout/LayoutLR/Right/Right';

const Posts = (props) => {
  const {onFetchPost} = props;
  const location = useLocation();
  const [page, setPage] = useState(1);
  useEffect(() => {
    // window.addEventListener("scroll", infiniteScroll);
    const query = new URLSearchParams(location.search);
    let category = null;
    for(let param of query.entries()) {
      if(param[0] === 'loai-bai-viet') {
        category = param[1];
      }
    }
    category ? onFetchPost({category: category, limit: 8, page: page }) : onFetchPost({ limit: 8, page: page });
  }, [onFetchPost, page, location]);

  const fetchPostsByPageHandler = (page) => {
    props.history.push({
      search: "?page=" + page,
    });
    setPage(page);
    props.onFetchPost({ limit: 8, page: page });
  };

  let postsElement = null;
  if (props.posts) {
    postsElement = props.posts.map((post) => (
      <PostItem post={post} key={post.id} />
    ));
  }
  return (
    <LayoutContainer>
      <Left>
        <div className="post-list-box">
          {postsElement}
          <div className="panigation-box">
            <Panigation onFetchData={fetchPostsByPageHandler} />
          </div>
        </div>
      </Left>
      <Right>
        <PostSideBar mode="category" />
      </Right>
    </LayoutContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (payload) => {
      dispatch(actions.fetchPost(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
