import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import "../../../components/SearchCreatures/SearchResult/SearchResult.css";
import "./Creatures.css";
import { getQuery } from "../../../store/utilities/updateObject";
import FormSearch from "../../../components/SearchCreatures/SearchResult/FormFilter/FormFilter";
import Panigation from "../../../components/Panigation/Panigation";
import TableAdminvV1 from "../../../components/UI/TableAdminvV1/TableAdminvV1";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import CreaturesFilter from "./CreaturesFiter/CreaturesFilter";
import Modal from "../../../components/UI/Modal/Modal";

const TABLE_CONFIG = {
  id: "Id",
  name_vn: "Tên tiếng việt",
  name_latin: "Tên Latin",
  species_vn: "Loài",
  group_vn: "Lớp",
  order_vn: "Bộ",
  family_vn: "Họ",
  created_at: "Ngày tạo",
  created_by: "Sửa",
};

const Creatures = (props) => {
  const [formInput, setFormInput] = useState({
    species: 0,
    group: [],
    order: [],
    family: [],
    name: "",
  });

  const [formOption, setFormOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [pageInput, setPageInput] = useState(1);

  const { onFetchFilterData, filterData, onFetchCreatures, token } = props;

  useEffect(() => {
    onFetchFilterData();
    onFetchCreatures();
  }, [onFetchFilterData, onFetchCreatures]);

  useEffect(() => {
    props.history.push({
      search: "",
    });
  }, [props.history]);

  const onChangePageInput = (event) => {
    const pageInputUpdate = event.target.value.replace(/[^0-9]/g, "");
    setPageInput(pageInputUpdate);
  };

  const fetchCreaturesHandler = (title, formInput) => {
   
    if (title) {
      const formInputUpdate = { ...formInput };
      formInputUpdate.name = title;
      setFormInput(formInputUpdate);
    }
    if (formInput) {
      setFormInput(formInput);
    }
    
  };
  useEffect(() => {
    let queryString = getQuery({ ...formInput, page: 1 });
    props.onFetchCreatures(queryString);
    props.history.push({
      search: queryString,
    });
  }, [formInput]);
  const onFetchCreaturesByPage = (page) => {
    let queryString = getQuery({ ...formInput, page: page });
    props.onFetchCreatures(queryString);
    props.history.push({
      search: queryString,
    });
  };

  const history = useHistory();
  const onViewDetailHandler = (creature) => {
    history.push(`/admin/sinh-vat/${creature.id}`);
  };

  const modelShowHandler = () => {
    setShowModal((prev) => !prev);
  };

  const onResetFormInput = () => {
    setFormInput({
      species: 0,
      group: [],
      order: [],
      family: [],
      name: "",
    });
  };

  return (
    <section className="cd-gallery">
      <Modal show={showModal} modalClosed={modelShowHandler}>
        <CreaturesFilter formClosed={modelShowHandler} loadData={fetchCreaturesHandler} />
      </Modal>
      {token ? null : <Redirect to="/" />}
      {props.creatures ? (
        <TableAdminvV1
          filterHandler={modelShowHandler}
          tableConfig={TABLE_CONFIG}
          data={props.creatures}
          sideBarClick={props.sideBarClick}
          onViewDetail={onViewDetailHandler}
          onEdit={onViewDetailHandler}
          resetClick={onResetFormInput}
          // createClick={createNewPost}
          // deleteClick={deletePost}
          onSearchData={fetchCreaturesHandler}
          fetchData={onFetchCreaturesByPage}
          numberOfPages={props.numberOfPages}
        />
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.creatures.page,
    filterData: state.creatures.filterData,
    filterDataLoading: state.creatures.loading,
    loadFilterDataErr: state.creatures.error,
    creatures: state.creatures.creatures,
    numberOfPages: state.creatures.numberOfPages,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCreatures: (queryArray) => {
      dispatch(actions.fetchCreatures(queryArray));
    },
    onFetchFilterData: () => {
      dispatch(actions.fetchFilterData());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Creatures));
