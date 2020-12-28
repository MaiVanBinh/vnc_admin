import React from "react";
import "./FormFilter.css";
import ButtonCustom from "../../../UI/ButtonCustom/ButtonCustom";

const FormFilter = (props) => {
  const onFormSubmit = (event) => {
    event.preventDefault();
    props.fetchCreaturesHandler();
  };

  let checkBoxFilter = null;
  if (
    props.formOption.group.options &&
    props.formOption.order.options &&
    props.formOption.family.options
  ) {
    checkBoxFilter = [];
    for (const elementproperty in props.formOption) {
      if (elementproperty === "species") {
        continue;
      }
      let options = props.formOption[elementproperty].options.map((e) => {
        return (
          <li key={elementproperty + "" + e.id}>
            <input
              className="filter"
              data-filter=".check1"
              type="checkbox"
              name={elementproperty}
              id={elementproperty + "" + e.id}
              onChange={(event) => props.changeInput(event, elementproperty)}
              value={e.id}
              checked={
                props.formInput[elementproperty].findIndex(
                  (input) => input === parseInt(e.id)
                ) > -1
              }
            />
            <label
              className="checkbox-label"
              htmlFor={elementproperty + "" + e.id}
            >
              {e.name_vn}
            </label>
          </li>
        );
      });
      const checkBox = (
        <div className="cd-filter-block" key={elementproperty}>
          <h4>{props.formOption[elementproperty].label}</h4>

          <ul className="cd-filter-content cd-filters list">{options}</ul>
        </div>
      );
      checkBoxFilter.push(checkBox);
    }
  }

  let radioFilterBox = null;
  if (
    props.formOption.species.options &&
    props.formOption.species.options.length > 0
  ) {
    const speciesUpdate = [...props.formOption.species.options];

    let radioFilter = speciesUpdate.map((opt) => (
      <li key={opt.id}>
        <input
          className="filter"
          type="radio"
          name="species"
          id={opt.id}
          value={opt.id}
          onChange={(event) => props.changeInput(event, "species")}
          checked={parseInt(opt.id) === props.formInput.species}
        />
        <label className="radio-label" htmlFor={opt.id}>
          {opt.name_vn}
        </label>
      </li>
    ));
    radioFilterBox = (
      <div className="cd-filter-block">
        <h4>{props.formOption.species.label}</h4>
        <ul className="cd-filter-content cd-filters list">{radioFilter}</ul>
      </div>
    );
  }

  return (
    <div className="cd-filter" style={props.showFilter ? {transform: 'translateX(-300px)', transition: '0.3s ease-in-out', width: '0px'} : null}>
      <form onSubmit={onFormSubmit}>
        {/* <div className="btn-box">
          <ButtonCustom
            title="Làm mới"
            typeBt="reset"
            onClickHandle={props.onResetFormInput}
          />
          <ButtonCustom title="Tìm" typeBt="submit" />
        </div> */}
        <div className="input-name">
          <input
            name="creatureName"
            value={props.formInput.name}
            placeholder="Nhập tên việt name hoặc latin loài động vật"
            onChange={(event) => props.changeInput(event)}
          />
        </div>

        {radioFilterBox}
        {checkBoxFilter}
      </form>
    </div>
  );
};

export default FormFilter;
