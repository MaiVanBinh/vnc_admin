import React, { useState, useEffect } from "react";
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
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';

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

  const [showModal, setShowModal] = useState(false);
  const { onFetchFilterData, filterData, onFetchCreatures, token } = props;
  const [cDelete, setCDelete] = useState(null);

  useEffect(() => {
    onFetchFilterData();
    onFetchCreatures();
  }, [onFetchFilterData, onFetchCreatures]);

  useEffect(() => {
    props.history.push({
      search: "",
    });
  }, [props.history]);

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

  const createCreatures = () => {
    window.location.href = '/admin/sinh-vat/create';
  }
  
  const deleteCreatureHandler = () => {
    props.onDeleteCreature(cDelete.id, props.token);
    setCDelete(null);
  }

  const deleteCreatures = (creature) => {
    setCDelete(creature);
  }

  return (
    <section className="cd-gallery">
      <Modal show={showModal} modalClosed={modelShowHandler}>
        <CreaturesFilter formClosed={modelShowHandler} loadData={fetchCreaturesHandler} />
      </Modal>
      {token ? null : <Redirect to="/" />}
      <Modal show={cDelete} formClosed={() => setCDelete(null)}>
        <DeleteConfirm deleteItem={cDelete} cancelDelete={() => setCDelete(null)} deleteConfirmHandler={deleteCreatureHandler}/>
      </Modal>
      {props.creatures ? (
        <TableAdminvV1
          filterHandler={modelShowHandler}
          tableConfig={TABLE_CONFIG}
          data={props.creatures}
          sideBarClick={props.sideBarHanlder}
          onViewDetail={onViewDetailHandler}
          onEdit={onViewDetailHandler}
          resetClick={onResetFormInput}
          createClick={createCreatures}
          deleteClick={deleteCreatures}
          onSearchData={fetchCreaturesHandler}
          fetchData={onFetchCreaturesByPage}
          total={props.total}
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
    total: state.creatures.total
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
    onDeleteCreature: (id, token) => dispatch(actions.deleteCreature(id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Creatures));
