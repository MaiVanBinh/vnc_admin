import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Creatures.css";
import SearchResult from "../../components/Search/SearchResult/SearchResult";
import Aux from "../../hoc/Auxiliary";
import * as actions from "../../store/actions/index";
import Loading from "../../components/UI/Loader/Loader";
import Modal from "../../components/UI/Modal/Modal";
import SimpleSlider from "./OverviewBanner/OverviewBanner";
import Identification from './Identification/Identification';

const Creatures = (props) => {
  useEffect(() => {
    props.onFetchFilterData();
    props.onFetchCreatures();
    props.onFetchHashTagId();
  }, [props]);
  
  const confirmError = () => {
    props.onDeleteError();
  };
  return (
    <Aux>
      <SimpleSlider />
      {props.error ? (
        <Modal show BackdropClicked={confirmError}>
          {props.error}
        </Modal>
      ) : null}
      {props.filterDataLoading ? (
        <Loading />
      ) : (
        <Aux>
          <main className="cd-main-content">
            <SearchResult />
          </main>
        </Aux>
      )}
      <Identification />
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.creatures.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFilterData: () => {
      dispatch(actions.fetchFilterData());
    },
    onFetchCreatures: () => {
      dispatch(actions.fetchCreatures());
    },
    onDeleteError: () => {
      dispatch(actions.deleteError());
    },
    onFetchHashTagId: () => {
      dispatch(actions.fetchHashTagId())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creatures);
