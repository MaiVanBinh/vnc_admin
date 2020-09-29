import React from "react";
import Aux from "../../hoc/Auxiliary";
import { connect } from "react-redux";
import Loading from "../UI/Loader/Loader";

const CurrentPost = (props) => {
  return (
    <Aux>
      {props.post && !props.loading ? (
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: props.post.content,
          }}
        />
      ) : (
        <Loading />
      )}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.posts.currentPost,
    loading: state.posts.loading,
  };
};

export default connect(mapStateToProps)(CurrentPost);
