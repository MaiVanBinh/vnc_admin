import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import "./SearchResult.css";
import { getQuery } from '../../../store/utilities/updateObject';
import Introduction from "./Introduction/Introduction";
import FormSearch from "./FormFilter/FormFilter";
import Panigation from "../../Panigation/Panigation";
import CreaturesItems from "../CreaturesItems/CreaturesItems";
import * as actions from "../../../store/actions/index";


const SearchResult = (props) => {
  const [introduction] = useState({
    creatureNum: 2000,
    lastUpdated: "10-10-2020",
  });

  const [formInput, setFormInput] = useState({
    species: 0,
    group: [],
    order: [],
    family: [],
    name: ''
  });

  const [formOption, setFormOption] = useState(null);

  const [pageInput, setPageInput] = useState(1);
  const { onFetchFilterData, filterData, onFetchCreatures } = props;
  useEffect(() => {
    onFetchFilterData();
    onFetchCreatures();
  }, [onFetchFilterData, onFetchCreatures]);

  const initFormOption = useCallback(() => {
    let formInputUpdate = {
      species: {
        label: "Loài",
        options:  [
          {
            id: "0",
            name_vn: "Tất cả",
          },
          ...props.filterData.species,
        ],
      },
      group: {
        label: "Nhóm",
        options: [...props.filterData.group],
      },
      order: {
        label: "Bộ",
        options: [...props.filterData.order],
      },
      family: {
        label: "Họ",
        options: [...props.filterData.family],
      },
    };
    setFormOption(formInputUpdate);
  }, [props.filterData]);
  useEffect(() => {
    if(filterData) {
      initFormOption();
    }
  }, [initFormOption, filterData]);

  useEffect(() => {
    props.history.push({
      search: ''
    });
  }, [props.history]);

  const onChangePageInput = (event) => {
    const pageInputUpdate = event.target.value.replace(/[^0-9]/g, "");
    setPageInput(pageInputUpdate);
  };

  const changeInput = (event) => {
    const formInputUpdate = formInput;
    let formOptionUpdate = { ...formOption };
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('change1')
    if (name === "species") {
      console.log('change')
      formInputUpdate.species = parseInt(value);
      formInputUpdate.group = [];
      formInputUpdate.order = [];
      formInputUpdate.family = [];
      formOptionUpdate = updateOptionFollowInput(formInputUpdate);
    } else if(name === 'creatureName') {
      formInputUpdate.name = value;
    } else {
      let checked = target.checked;
      if (checked) {
        formInputUpdate[name].push(parseInt(value));
      } else {
        let updateOpt = [...formInputUpdate[name]];
        const valueIndex = updateOpt.indexOf(parseInt(value));
        updateOpt.splice(valueIndex, 1);
        formInputUpdate[name] = [...updateOpt];
        if (name === "group") {
          formInputUpdate.order = [];
          formInputUpdate.family = [];
        }
        if (name === "order") {
          formInputUpdate.family = [];
        }
      }
      formOptionUpdate = updateOptionFollowInput(formInputUpdate);
    }
    setFormOption(formOptionUpdate);
    setFormInput({ ...formInputUpdate });
  };

  const onResetFormInput = () => {
    setFormInput({
      species: 0,
      group: [],
      order: [],
      family: [],
      name: ''
    });
    if(props.filterData) {
      initFormOption();
    }
  };

  const updateOptionFollowInput = (formInputUpdate) => {
    let groupUpdateOption;
    if (formInputUpdate.species > 0) {
      groupUpdateOption = props.filterData.group.filter(
        (g) => parseInt(g.species) === formInputUpdate.species
      );
    } else {
      groupUpdateOption = [...props.filterData.group];
    }

    let orderUpdateOption;
    if (formInputUpdate.group.length === 0) {
      const setGroupId = groupUpdateOption.map((g) => g.id);
      orderUpdateOption = props.filterData.order.filter((o) => {
        return setGroupId.findIndex((gId) => gId === o.group) > -1;
      });
    } else {
      orderUpdateOption = props.filterData.order.filter((o) => {
        return (
          formInputUpdate.group.findIndex((gId) => gId === parseInt(o.group)) >
          -1
        );
      });
    }

    let familyUpdateOption;
    if (formInputUpdate.order.length === 0) {
      const setOrderId = orderUpdateOption.map((g) => g.id);
      familyUpdateOption = props.filterData.family.filter((f) => {
        return setOrderId.findIndex((oId) => oId === f.order) > -1;
      });
    } else {
      familyUpdateOption = props.filterData.family.filter((f) => {
        return (
          formInputUpdate.order.findIndex((oId) => oId === parseInt(f.order)) >
          -1
        );
      });
    }
    const updateOption = { ...formOption };
    return {
      ...updateOption,
      group: { ...updateOption.group, options: [...groupUpdateOption] },
      order: { ...updateOption.order, options: [...orderUpdateOption] },
      family: { ...updateOption.family, options: [...familyUpdateOption] },
    };
  };

  const fetchCreaturesHandler = () => {
    let queryString = getQuery({ ...formInput, page: 1 })
    props.onFetchCreatures(queryString);
    props.history.push({
      search: queryString
    });
  };
  const onFetchCreaturesByPage = (page) => {
    let queryString = getQuery({ ...formInput, page: page })
    props.onFetchCreatures(queryString);
    props.history.push({
      search: queryString
    });
  };

  return (
    <section className="cd-gallery">
      <Introduction introduction={introduction} />
      {formOption ? (
        <FormSearch
          formInput={formInput}
          formOption={formOption}
          changeInput={changeInput}
          onResetFormInput={onResetFormInput}
          fetchCreaturesHandler={fetchCreaturesHandler}
        />
      ) : null}
      {props.creatures ? <CreaturesItems creatures={props.creatures} /> : null}
      <Panigation
        page={pageInput}
        changePageHandler={onChangePageInput}
        onFetchData={onFetchCreaturesByPage}
        numberOfPages={props.numberOfPages}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResult));
