import React, {useEffect} from "react";
import "./PostSideBar.css";
import PostSideBarItem from "./PostSideBarItem/PostSideBarItem";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const PostSideBar = (props) => {
    useEffect(() => {
        props.onFetchPost({category: 'all_events'});
        props.onFetchPost({category: 'all_species'});
      }, []);
  return (
    <div className="post">
      {props.all_species ? (
        <PostSideBarItem title="THÔNG TIN MỚI" posts={props.all_species} />
      ) : null}
      {props.all_events ? (
        <PostSideBarItem title="TỰ NHIÊN BÍ ẨN" posts={props.all_events} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    all_species: state.posts.all_species,
    all_events: state.posts.all_events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (payload) => {
      dispatch(actions.fetchPost(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostSideBar);
