import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./CreaturesDetail.css";
import * as actions from "../../store/actions/index";
import DetailHeader from "./DetailHeader/DetailHeader";
import PostSideBar from "../../components/PostSideBar/PostSideBar";
import { withRouter } from 'react-router-dom';

const CreaturesDeail = (props) => {
  const onFetchCreatureById = props.onFetchCreatureById;
  useEffect(() => {
    onFetchCreatureById(props.match.params.id);
  }, [props.match.params.id, onFetchCreatureById]);
  return (
      <div className="creature-detail">
        <div className="content">
          {props.creature ? <DetailHeader creature={props.creature} /> : null}
          {props.creature ? (
            <div
              className="creatures-content content-detail"
              dangerouslySetInnerHTML={{
                __html: props.creature.description.replaceAll("<br />", ""),
              }}
            ></div>
          ) : null}
        </div>
        <PostSideBar />
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    creature: state.creatures.creature,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCreatureById: (id) => {
      dispatch(actions.fetchCreatureById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreaturesDeail));
