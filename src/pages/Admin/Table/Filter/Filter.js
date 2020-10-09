import React, { useState } from "react";
import './Filter.css';
import minusButton from "../../../../assets/icons/minus-button.svg";
import InputDropDown from "../../../../components/UI/InputDropDown/InputDropDown";
import AddButton from "../../../../assets/icons/add-button.svg";
import ButtonCustom from "../../../../components/UI/ButtonCustom/ButtonCustom";
import {CREATURES} from '../../../../models/creatures';

const OPERATOR = {
  string: ["like", "exact"],
  number: ["less", "greater", "equal", "between"],
};

const NUMBER_RESULT_LIST = [20, 50, 100];

const ListFilter = (props) => {
  const [conditions, setCondition] = useState([]);
  const [countCondition, setCountCondition] = useState(0);
  const [numberResult, setNumberResult] = useState(20);

  const [options, setOptions] = useState(CREATURES);

  const addFilterHandler = () => {
    const updateCondition = [
      ...conditions,
      {
        id: countCondition,
        attribute: null,
        operator: null,
        value: null,
        dataType: null,
      },
    ];
    setCountCondition((count) => count + 1);
    setCondition(updateCondition);
  };

  // optName = option name
  const selectingAttributeHandler = (conditionId, optName) => {
    const updateCondition = [...conditions];
    const index = updateCondition.findIndex((c) => c.id === conditionId);
    const optindex = options.find((o) => o.attributeName === optName);
    updateCondition[index]["attribute"] = optName;
    updateCondition[index]["dataType"] = optindex.dataType;
    setCondition(updateCondition);
  };

  const removeConditionHandler = (id) => {
    const updateCondition = [...conditions.filter((c) => c.id !== id)];
    setCondition(updateCondition);
  };

  const searchForFilterHandler = () => {
    console.log(conditions);
  };

  const selectingOperatorHandler = (conditionId, operator) => {
    const updateCondition = [...conditions];
    const index = updateCondition.findIndex((c) => c.id === conditionId);
    updateCondition[index]["operator"] = operator;
    setCondition(updateCondition);
  };

  const changeInputHandler = (event, cId) => {
    const updateCondition = [...conditions];
    const index = updateCondition.findIndex((c) => c.id === cId);
    updateCondition[index]["value"] = event.target.value;
    setCondition(updateCondition);
  };

  const selectNumberResultHandler = (number) => {
    setNumberResult(number);
  };
  let cdt = null;
  if (conditions.length > 0) {
    cdt = conditions.map((c) => {
      let value = null;
      if (c.dataType === "string" && c.operator === "like") {
        value = (
          <input
            type="text"
            value={c.value}
            onChange={(event) => changeInputHandler(event, c.id)}
          />
        );
      }
      if (c.dataType === "number" && c.operator === "between") {
        value = (
          <div style={{ textAlign: "center" }}>
            <input type="number" />
            <p>and</p>
            <input type="number" value={c.value} />
          </div>
        );
      } else if (c.dataType === "number" && c.operator !== "between") {
        value = <input type="number" value={c.value} />;
      }
      return (
        <div className="list-filter" key={c.id}>
          <img
            src={minusButton}
            onClick={() => removeConditionHandler(c.id)}
            alt="sss"
          />
          <InputDropDown
            options={options}
            condition={c}
            selectingAttributeHandler={selectingAttributeHandler}
            title={c.attribute ? c.attribute : "Select attribute"}
          />
          {c.attribute ? (
            <InputDropDown
              condition={c}
              options={OPERATOR[c.dataType]}
              mode="operator"
              selectingOperatorHandler={selectingOperatorHandler}
              title={c.operator ? c.operator : "Select operator"}
            />
          ) : null}
          {value}
        </div>
      );
    });
  }
  return (
    <div className="admin_filter">
      <div style={{marginLeft: '40px', minHeight: '50px', display: 'flex', alignItems: 'center'}}>
        <InputDropDown
          options={NUMBER_RESULT_LIST}
          mode="numberResult"
          selectNumberResultHandler={selectNumberResultHandler}
          title={`${numberResult} rows`}
        />
      </div>

      {cdt}
      <div className="admin-fitler-btn">
        <img src={AddButton} onClick={() => addFilterHandler()} alt="img" />
        <ButtonCustom title="Tìm" onClickHandle={searchForFilterHandler} />
      </div>
    </div>
  );
};

export default ListFilter;
