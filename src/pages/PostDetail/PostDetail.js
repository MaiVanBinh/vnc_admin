import React, { useEffect } from "react";
import PostSideBar from "../../components/SideBar/SideBar";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./PostDetail.css";
import Loading from "../../components/UI/Loader/Loader";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";

const PostDetail = (props) => {
  const match = useRouteMatch();
  const { onFecthPostDetail } = props;
  useEffect(() => {
    onFecthPostDetail(match.params.id);
  }, [match, onFecthPostDetail]);
  return (
    <LayoutContainer>
      <Left>
        {props.post && !props.loading ? (
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: props.post.content.replaceAll(
                "http://vncreatures.net/chitiet.php?page=1&loai=2&img=1&ID=",
                ""
              ),
            }}
          />
        ) : (
          <Loading />
        )}
      </Left>
      <Right>
        <PostSideBar mode="creatures" image />
      </Right>
    </LayoutContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    post: state.posts.currentPost,
    loading: state.posts.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFecthPostDetail: (id) => dispatch(actions.fetchPostDetail(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
