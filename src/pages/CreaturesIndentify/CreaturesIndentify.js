import React, { useEffect } from "react";
import './CreaturesIndentify.css';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import Identification from "../../components/Identification/Identification";
import * as actions from "../../store/actions/index";
import Loading from "../../components/UI/Loader/Loader";

const CreaturesIndentify = (props) => {
  const { onFetchHashTagId, onFecthPostDetail, location } = props;
  useEffect(() => {
    onFetchHashTagId();
    const query = new URLSearchParams(location.search);
    for (let param of query.entries()) {
      if (param[0] === "id") {
        onFecthPostDetail(param[1]);
      }
    }
  }, [onFetchHashTagId, onFecthPostDetail, location]);
  return (
    <LayoutContainer>
      <Left>
        {props.post && !props.loading ? (
          <div
            className="identify-image"
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
        <Identification />
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
    onFetchHashTagId: () => {
      dispatch(actions.fetchHashTagId());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreaturesIndentify));
