import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./CreaturesDetail.css";
import * as actions from "../../store/actions/index";
import DetailHeader from "./DetailHeader/DetailHeader";
import PostSideBar from "../../components/SideBar/SideBar";
import { withRouter } from "react-router-dom";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";

const CreaturesDeail = (props) => {
  const onFetchCreatureById = props.onFetchCreatureById;
  useEffect(() => {
    onFetchCreatureById(props.match.params.id);
  }, [props.match.params.id, onFetchCreatureById]);
  return (
    <LayoutContainer>
      <Left>
        {props.creature ? <DetailHeader creature={props.creature} /> : null}
        {props.creature ? (
          <div
            className="creatures-content content-detail"
            dangerouslySetInnerHTML={{
              __html: props.creature.description.replaceAll("<br />", ""),
            }}
          ></div>
        ) : null}
      </Left>
      <Right>
        <PostSideBar image={true} mode="creatures" />
      </Right>
    </LayoutContainer>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreaturesDeail));
