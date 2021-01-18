import React, { useEffect, useState } from "react";
import "./Posts.css";
import { connect } from "react-redux";
import PostItem from "./PostItem/PostItem";
import PostSideBar from "../../components/SideBar/SideBar";
import * as actions from "../../store/actions/index";
import Panigation from "../../components/Panigation/Panigation";
import { useLocation, useHistory } from "react-router-dom";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
// import OverviewBanner from "../HomePage/OverviewBanner/OverviewBanner";

const Posts = (props) => {
  const { onFetchPost } = props;
  const location = useLocation();
  const history = useHistory();

  const [page, setPage] = useState(1);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let category = null;
    let page = 1;
    for (let param of query.entries()) {
      if (param[0] === "loai-bai-viet") {
        category = param[1];
      }
      if (param[0] === "page") {
        page = param[1];
      }
    }
    category
      ? onFetchPost({ category: category, limit: 8, page: page })
      : onFetchPost({ limit: 8, page: page });
    console.log(category);
  }, [onFetchPost, location]);

  const fetchPostsByPageHandler = (page) => {
    const query = new URLSearchParams(location.search);
    let category = null;
    for (let param of query.entries()) {
      if (param[0] === "loai-bai-viet") {
        category = param[1];
      }
    }
    const search = category ? `?loai-bai-viet=${category}&page=${page}` : null;
    history.push({
      search: search,
    });
  };

  let postsElement = null;
  if (props.posts) {
    postsElement = props.posts.map((post) => (
      <PostItem post={post} key={post.id} />
    ));
  }
  const onChangePageInput = (page) => {
    setPage(page);
  }
  
  return (
    <div>
      {/* <OverviewBanner /> */}
      <LayoutContainer>
        <Right>
          <PostSideBar mode="category" />
          <PostSideBar mode="ReligiousNames" />
          <PostSideBar mode="ScientificReports" />
        </Right>
        <Left>
          <div className="post-list-box">
            {postsElement}
            <div className="panigation-box">
              <Panigation
                onFetchData={fetchPostsByPageHandler}
                page={page}
                changePageHandler={onChangePageInput}
                // onFetchData={onFetchCreaturesByPage}
                numberOfPages={props.total}
              />
            </div>
          </div>
        </Left>
      </LayoutContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    total: state.posts.total
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
