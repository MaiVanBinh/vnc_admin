import React, { useState, useCallback, useEffect } from "react";
import FormCreateUpdate from "../../../../components/FormCreateUpdate/FormCreateUpdate";
import "./CreaturesFilter.css";
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const CreaturesFilter = (props) => {
  const [formInput, setFormInput] = useState({
    species: 0,
    group: [],
    order: [],
    family: [],
    name: "",
  });
  const [formOption, setFormOption] = useState(null);

  const submitAsset = () => {
    props.loadData(null, formInput);
    props.formClosed()
  };
  const {filterData} = props;

  const initFormOption = useCallback(() => {
    let formInputUpdate = {
      species: [
        {
          id: "0",
          name_vn: "All",
        },
        ...props.filterData.species,
      ],
      group: [...props.filterData.groups],
      order: [...props.filterData.orders],
      family: [...props.filterData.families]
    };
    setFormOption(formInputUpdate);
  }, [filterData]);

  useEffect(() => {
    if (filterData) {
      initFormOption();
    }
  }, [initFormOption, filterData]);

  const changeInput = (event) => {
    const formInputUpdate = {...formInput};
    let formOptionUpdate = { ...formOption };
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "species") {
      console.log("change");
      formInputUpdate.species = parseInt(value);
      formInputUpdate.group = [];
      formInputUpdate.order = [];
      formInputUpdate.family = [];
      formOptionUpdate = updateOptionFollowInput(formInputUpdate);
    } else if (name === "name") {
      formInputUpdate.name = value;
    } else {
        formInputUpdate[name] = [parseInt(value)];

        if (name === "group") {
          formInputUpdate.order = [];
          formInputUpdate.family = [];
        }
        if (name === "order") {
          formInputUpdate.family = [];
        }
      formOptionUpdate = updateOptionFollowInput(formInputUpdate);
    }
    setFormOption(formOptionUpdate);
    setFormInput({ ...formInputUpdate });
  };

  const updateOptionFollowInput = (formInputUpdate) => {
    let groupUpdateOption;
    if (formInputUpdate.species > 0) {
      groupUpdateOption = filterData.groups.filter(
        (g) => parseInt(g.species) === parseInt(formInputUpdate.species)
      );
    } else {
      groupUpdateOption = [...filterData.groups];
    }
    
    let orderUpdateOption;
    if (formInputUpdate.group.length === 0) {
      const setGroupId = groupUpdateOption.map((g) => g.id);
      orderUpdateOption = filterData.orders.filter((o) => {
        return setGroupId.findIndex((gId) => gId === o.group) > -1;
      });
    } else {
      orderUpdateOption = filterData.orders.filter((o) => parseInt(o.group) === formInputUpdate.group[0]);
    }

    let familyUpdateOption;
    if (formInputUpdate.order.length === 0) {
      const setOrderId = orderUpdateOption.map((g) => g.id);
      familyUpdateOption = filterData.families.filter((f) => {
        return setOrderId.findIndex((oId) => oId === f.order) > -1;
      });
    } else {
      familyUpdateOption = filterData.families.filter((f) => parseInt(f.order) === formInputUpdate.order[0]);
    }
    const updateOption = { ...formOption };
    return {
      ...updateOption,
      group: [...groupUpdateOption] ,
      order: [...orderUpdateOption],
      family: [...familyUpdateOption],
    };
  };

  const onResetFormInput = () => {
    setFormInput({
      species: 0,
      group: [],
      order: [],
      family: [],
      name: "",
    });
    if (props.filterData) {
      initFormOption();
    }
  };

  return (
    <FormCreateUpdate
      titleForm={props.editPost ? "Edit" : "Create"}
      onCloseHandler={props.formClosed}
    >
      <div className="filer-creature">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAsset();
          }}
        >
          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Name:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name Vn or Latin..."
                value={formInput.name}
                onChange={changeInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="Species">Species</label>
            </div>
            <div className="col-75">
              <select
                id="species"
                name="species"
                value={formInput.species}
                onChange={changeInput}
              >
                {formOption && formOption.species
                  ? formOption.species.map((item) => (
                      <option value={item.id} key={item.id}>{item.name_vn}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="group">Group</label>
            </div>
            <div className="col-75">
              <select
                id="group"
                name="group"
                value={formInput.group ? formInput.group[0] : null}
                onChange={changeInput}
                multiple={false}
              >
                {formOption && formOption.group
                  ? formOption.group.map((item) => (
                      <option value={item.id} key={item.id}>{item.name_vn}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="order">Order</label>
            </div>
            <div className="col-75">
              <select
                id="order"
                name="order"
                value={formInput.order ? formInput.order[0] : null}
                onChange={changeInput}
              >
                {formOption && formOption.order
                  ? formOption.order.map((item) => (
                      <option value={item.id} key={item.id}>{item.name_vn}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="family">Family</label>
            </div>
            <div className="col-75">
              <select
                id="family"
                name="family"
                value={formInput.family ? formInput.family[0] : null}
                onChange={changeInput}
              >
                {formOption && formOption.family
                  ? formOption.family.map((item) => (
                      <option value={item.id} key={item.id}>{item.name_vn}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Gửi" />
          </div>
        </form>
      </div>
    </FormCreateUpdate>
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

  
export default connect(mapStateToProps, mapDispatchToProps)(CreaturesFilter);
